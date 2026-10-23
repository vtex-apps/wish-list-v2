import { AuthenticationError } from '@vtex/api'

const SESSION_ITEMS = [
  'authentication.storeUserEmail',
  'impersonate.storeUserEmail',
]

interface SessionValue {
  value?: string
}

interface SessionData {
  namespaces?: {
    authentication?: { storeUserEmail?: SessionValue }
    impersonate?: { storeUserEmail?: SessionValue }
  }
}

/* Only trusts impersonation granted by the session server to the same user that owns the auth token. */
const getImpersonatedEmail = async (ctx: Context, operatorEmail: string) => {
  const {
    cookies,
    vtex: { sessionToken },
    clients: { session },
  } = ctx

  const token = sessionToken ?? cookies.get('vtex_session')

  if (!token) {
    return null
  }

  try {
    const { sessionData } = await session.getSession(token, SESSION_ITEMS)
    const { namespaces } = (sessionData ?? {}) as SessionData
    const sessionOperator = namespaces?.authentication?.storeUserEmail?.value
    const impersonated = namespaces?.impersonate?.storeUserEmail?.value

    if (
      !impersonated ||
      sessionOperator?.toLowerCase() !== operatorEmail.toLowerCase()
    ) {
      return null
    }

    return impersonated
  } catch (error) {
    ctx.vtex.logger.warn({ message: 'auth-get-session-failed', error })

    return null
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

  const credential = await vtexId
    .validateCredential(cookie)
    .catch((error) => {
      if (error?.response?.status !== 401) {
        ctx.vtex.logger.warn({
          message: 'auth-validate-credential-failed',
          error,
        })
      }

      return null
    })

  if (
    credential?.authStatus !== 'Success' ||
    !credential.id ||
    !credential.user ||
    credential.account !== ctx.vtex.account
  ) {
    throw new AuthenticationError('Unauthorized access')
  }

  const impersonatedEmail = await getImpersonatedEmail(ctx, credential.user)

  return { email: impersonatedEmail ?? credential.user }
}
