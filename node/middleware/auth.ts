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
  | { hinted: false }
  | { hinted: true; namespaces: SessionNamespaces }
  | { hinted: true; missingToken: true }
  | { hinted: true; error: unknown }

/* The hint cookie is client-controlled: it only decides whether to ask the session, never which email to use. */
const fetchImpersonationSession = async (
  ctx: Context
): Promise<SessionResult> => {
  const {
    cookies,
    vtex: { sessionToken },
    clients: { session },
  } = ctx

  if (!cookies.get(IMPERSONATION_HINT_COOKIE)) {
    return { hinted: false }
  }

  const token = sessionToken ?? cookies.get('vtex_session')

  if (!token) {
    return { hinted: true, missingToken: true }
  }

  try {
    const { sessionData } = await session.getSession(token, SESSION_ITEMS)

    return { hinted: true, namespaces: sessionData?.namespaces ?? {} }
  } catch (error) {
    return { hinted: true, error }
  }
}

/* During impersonation the operator must only act as the customer: anything unconfirmed is refused, never downgraded to the operator. */
const resolveEmail = (
  ctx: Context,
  sessionResult: SessionResult,
  operatorEmail: string
) => {
  if (!sessionResult.hinted) {
    return operatorEmail
  }

  if ('error' in sessionResult) {
    ctx.vtex.logger.error({
      message: 'auth-get-session-failed',
      error: sessionResult.error,
    })

    throw new Error('Could not resolve impersonation session')
  }

  if ('missingToken' in sessionResult) {
    ctx.vtex.logger.warn({ message: 'auth-impersonation-missing-session' })

    throw new ForbiddenError('Impersonation could not be confirmed')
  }

  const { namespaces } = sessionResult
  const sessionOperator = namespaces.authentication?.storeUserEmail?.value
  const impersonated = namespaces.impersonate?.storeUserEmail?.value

  if (sessionOperator?.toLowerCase() !== operatorEmail.toLowerCase()) {
    ctx.vtex.logger.warn({ message: 'auth-impersonation-operator-mismatch' })

    throw new ForbiddenError('Impersonation could not be confirmed')
  }

  /* The session confirms the operator is not impersonating anymore (stale hint cookie). */
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
    fetchImpersonationSession(ctx),
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
