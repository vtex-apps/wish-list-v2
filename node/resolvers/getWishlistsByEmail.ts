import { auth } from '../middleware/auth'
import { configuration } from '../middleware/configuration'

export const getWishlistsByEmail = async (
  _: unknown,
  args: {
    email: string
    page: number
    pageSize: number
  },
  ctx: Context
) => {
  const {
    clients: { md },
  } = ctx

  const { page, pageSize } = args

  const pagination = {
    page,
    pageSize,
  }

  const [{ email }] = await Promise.all([auth(ctx), configuration(ctx)])

  const wishlists = await md.searchWistlist('email', email, pagination)

  return wishlists || null
}
