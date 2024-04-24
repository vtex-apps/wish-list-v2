import { AuthenticationError } from '@vtex/api'

import { auth } from '../middleware/auth'
import type { WishlistUpdateArs } from '../typings/wishlist'

export const updateWishlist = async (
  _: unknown,
  args: WishlistUpdateArs,
  ctx: Context
) => {
  const {
    clients: { md },
  } = ctx

  const { email } = await auth(ctx)

  const { wishlist } = args || {}

  if (!wishlist?.id) {
    throw new Error('An id must be provided')
  }

  const { email: emailUser, id, wishlistType, isPublic, products } =
    (await md.getWishlist(wishlist.id)) || {}

  const existWishlist = id

  if (!existWishlist) {
    throw new Error('An wishlist with this id does not exist')
  }

  if (emailUser !== email) {
    throw new AuthenticationError('Unauthorized access')
  }

  const updatedWishlist = {
    id,
    email: wishlist?.email || emailUser,
    wishlistType: wishlist?.wishlistType || wishlistType,
    isPublic: wishlist?.isPublic || isPublic,
    products: wishlist?.products || products,
  }

  await md.updateWishlist(wishlist.id, updatedWishlist)

  return {
    id: wishlist.id,
    success: true,
  }
}
