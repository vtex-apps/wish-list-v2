import { AuthenticationError } from '@vtex/api'

export const auth = async (ctx: Context) => {
  const {
    cookies,
    clients: { vtexId },
  } = ctx

  let email = cookies.get('vtex-impersonated-customer-email') as string

  if (!email) {
    const cookie = cookies.get(
      `VtexIdclientAutCookie_${ctx.vtex.account}`
    ) as string

    if (!cookie) {
      throw new AuthenticationError('Unauthorized access')
    }

    const user = await vtexId.getAuthenticatedUser(cookie)

    if (!user?.userId) {
      throw new AuthenticationError('Unauthorized access')
    }

    email = user.user
  }

  return { email }
}
