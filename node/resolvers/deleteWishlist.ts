import { AuthenticationError } from '@vtex/api'

import { auth } from '../middleware/auth'

export const deleteWishlist = async (
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

    const getWishlist = await md.getWishlist(id)

    const existWishlist = getWishlist?.id

    if (!existWishlist) {
      throw new Error('An wishlist with this id does not exist')
    }

    if (getWishlist?.email !== email) {
      throw new AuthenticationError('Unauthorized access')
    }

    await md.deleteWishlist(id)

    return {
      id,
      success: true,
    }
  } catch (error) {
    return error
  }
}
