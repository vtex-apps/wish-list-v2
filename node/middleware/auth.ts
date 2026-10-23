import { AuthenticationError } from '@vtex/api'

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
  | { namespaces: SessionNamespaces | null }
  | { error: unknown }

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
    return { namespaces: null }
  }

  const token = sessionToken ?? cookies.get('vtex_session')

  if (!token) {
    return { namespaces: null }
  }

  try {
    const { sessionData } = await session.getSession(token, SESSION_ITEMS)

    return { namespaces: sessionData?.namespaces ?? {} }
  } catch (error) {
    return { error }
  }
}

const getImpersonatedEmail = (
  namespaces: SessionNamespaces | null,
  operatorEmail: string
) => {
  const sessionOperator = namespaces?.authentication?.storeUserEmail?.value
  const impersonated = namespaces?.impersonate?.storeUserEmail?.value

  if (
    !impersonated ||
    sessionOperator?.toLowerCase() !== operatorEmail.toLowerCase()
  ) {
    return null
  }

  return impersonated
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
    vtexId.validateCredential(cookie).catch((error) => {
      if (error?.response?.status !== 401) {
        ctx.vtex.logger.warn({
          message: 'auth-validate-credential-failed',
          error,
        })
      }

      return null
    }),
    fetchImpersonationSession(ctx),
  ])

  if (
    credential?.authStatus !== 'Success' ||
    !credential.id ||
    !credential.user ||
    credential.account !== ctx.vtex.account
  ) {
    throw new AuthenticationError('Unauthorized access')
  }

  /* Failing here avoids silently acting on the operator's own wishlists when the session is unavailable. */
  if ('error' in sessionResult) {
    ctx.vtex.logger.warn({
      message: 'auth-get-session-failed',
      error: sessionResult.error,
    })

    throw new Error('Could not resolve impersonation session')
  }

  const impersonatedEmail = getImpersonatedEmail(
    sessionResult.namespaces,
    credential.user
  )

  return { email: impersonatedEmail ?? credential.user }
}
