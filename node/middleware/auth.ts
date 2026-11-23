import { AuthenticationError, ForbiddenError } from '@vtex/api'

const IMPERSONATION_HINT_COOKIE = 'vtex-impersonated-customer-email'

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

/* Impersonation is decided by the session, not by the client-controlled hint cookie; anything unconfirmed is refused, never downgraded to the operator. */
const resolveEmail = (
  ctx: Context,
  sessionResult: SessionResult,
  operatorEmail: string
) => {
  const hinted = !!ctx.cookies.get(IMPERSONATION_HINT_COOKIE)

  if ('error' in sessionResult) {
    ctx.vtex.logger.error({
      message: 'auth-get-session-failed',
      error: sessionResult.error,
    })

    throw new Error('Could not resolve session')
  }

  if ('missingToken' in sessionResult) {
    if (!hinted) {
      return operatorEmail
    }

    ctx.vtex.logger.warn({ message: 'auth-impersonation-missing-session' })

    throw new ForbiddenError('Impersonation could not be confirmed')
  }

  const { namespaces } = sessionResult
  const sessionOperator = namespaces.authentication?.storeUserEmail?.value
  const impersonated = namespaces.impersonate?.storeUserEmail?.value
  const operatorMatches =
    sessionOperator?.toLowerCase() === operatorEmail.toLowerCase()

  if ((impersonated || hinted) && !operatorMatches) {
    ctx.vtex.logger.warn({ message: 'auth-impersonation-operator-mismatch' })

    throw new ForbiddenError('Impersonation could not be confirmed')
  }

  return impersonated ?? operatorEmail
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
    vtexId.validateCredential(cookie).catch((error) => {
      if (error?.response?.status === 401) {
        return null
      }

      ctx.vtex.logger.error({
        message: 'auth-validate-credential-failed',
        error,
      })

      throw error
    }),
    fetchSession(ctx),
  ])

  if (
    credential?.authStatus !== 'Success' ||
    !credential.id ||
    !credential.user
  ) {
    throw new AuthenticationError('Unauthorized access')
  }

  if (credential.account !== ctx.vtex.account) {
    ctx.vtex.logger.warn({
      message: 'auth-credential-account-mismatch',
      tokenAccount: credential.account,
    })

    throw new AuthenticationError('Unauthorized access')
  }

  return { email: resolveEmail(ctx, sessionResult, credential.user) }
}
