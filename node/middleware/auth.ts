import { AuthenticationError, ForbiddenError } from '@vtex/api'

import type { ValidatedCredential } from '../clients/vtexId'
import { describeError } from '../utils/describeError'

const IMPERSONATION_HINT_COOKIE = 'vtex-impersonated-customer-email'

const IMPERSONATION_FORBIDDEN =
  'Wishlists are not available while impersonating'

const SESSION_ITEMS = [
  'authentication.storeUserEmail',
  'impersonate.storeUserEmail',
]

interface SessionValue {
  value?: string
}

interface SessionNamespaces {
  authentication?: { storeUserEmail?: SessionValue }
  impersonate?: { storeUserEmail?: SessionValue }
}

type SessionResult =
  | { namespaces: SessionNamespaces }
  | { missingToken: true }
  | { error: unknown }

const fetchSession = async (ctx: Context): Promise<SessionResult> => {
  const {
    cookies,
    vtex: { sessionToken },
    clients: { session },
  } = ctx

  const token = sessionToken ?? cookies.get('vtex_session')

  if (!token) {
    return { missingToken: true }
  }

  try {
    const { sessionData } = await session.getSession(token, SESSION_ITEMS)

    return { namespaces: sessionData?.namespaces ?? {} }
  } catch (error) {
    return { error }
  }
}

/* Wishlists are personal: whoever is impersonating may not read or change any list, theirs or the customer's. */
const assertNotImpersonating = (
  ctx: Context,
  sessionResult: SessionResult,
  userEmail: string
) => {
  const hinted = !!ctx.cookies.get(IMPERSONATION_HINT_COOKIE)

  if ('error' in sessionResult) {
    ctx.vtex.logger.error({
      message: 'auth-get-session-failed',
      ...describeError(sessionResult.error),
    })

    throw new Error('Could not resolve session')
  }

  const forbid = (reason: string) => {
    ctx.vtex.logger.warn({ message: 'auth-impersonation-blocked', reason })

    return new ForbiddenError(IMPERSONATION_FORBIDDEN)
  }

  if ('missingToken' in sessionResult) {
    if (hinted) {
      throw forbid('hint-without-session')
    }

    return
  }

  const { namespaces } = sessionResult
  const sessionUser = namespaces.authentication?.storeUserEmail?.value
  const impersonated = namespaces.impersonate?.storeUserEmail?.value

  if (impersonated) {
    throw forbid('impersonating')
  }

  /* A hint whose session belongs to someone else cannot prove impersonation has ended. */
  if (hinted && sessionUser?.toLowerCase() !== userEmail.toLowerCase()) {
    throw forbid('unconfirmed-hint')
  }
}

export const auth = async (ctx: Context) => {
  const {
    cookies,
    clients: { vtexId },
  } = ctx

  const cookie = cookies.get(`VtexIdclientAutCookie_${ctx.vtex.account}`)

  if (!cookie) {
    throw new AuthenticationError('Unauthorized access')
  }

  const [credential, sessionResult] = await Promise.all([
    /* Only an explicit 401 means a bad token; other failures are VTEX ID outages and must not look like logouts. */
    vtexId.validateCredential(cookie).catch((error): ValidatedCredential => {
      if (error?.response?.status === 401) {
        return { authStatus: 'HttpUnauthorized' }
      }

      ctx.vtex.logger.error({
        message: 'auth-validate-credential-failed',
        ...describeError(error),
      })

      /* A fresh error: the framework logs the original's request config, which carries the token. */
      throw new Error('Could not validate credential')
    }),
    fetchSession(ctx),
  ])

  if (
    credential?.authStatus !== 'Success' ||
    !credential.id ||
    !credential.user
  ) {
    /* Expired sessions land here too: watch the rate against the pre-deploy baseline, not single events. */
    ctx.vtex.logger.warn({
      message: 'auth-credential-rejected',
      authStatus: credential?.authStatus,
      hasId: !!credential?.id,
      hasUser: !!credential?.user,
    })

    throw new AuthenticationError('Unauthorized access')
  }

  if (credential.account !== ctx.vtex.account) {
    ctx.vtex.logger.warn({
      message: 'auth-credential-account-mismatch',
      tokenAccount: credential.account,
    })

    throw new AuthenticationError('Unauthorized access')
  }

  assertNotImpersonating(ctx, sessionResult, credential.user)

  return { email: credential.user }
}
