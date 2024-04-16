import { AuthenticationError } from '@vtex/api'

import { auth } from '../middleware/auth'

export const getWishlist = async (
  _: unknown,
  args: { id: string },
  ctx: Context
) => {
  const {
    clients: { md },
  } = ctx

  const { id } = args

  try {
    const { email } = await auth(ctx)

    const wishlist = await md.getWishlist(id)

    if (email !== wishlist.email) {
      throw new AuthenticationError('Unauthorized access')
    }

    return wishlist

  } catch (error) {
    return error
  }
}
