import type { WishlistInput } from '../typings/wishlist'
import { auth } from '../middleware/auth'

export const createWishlist = async (
  _: unknown,
  args: WishlistInput,
  ctx: Context
) => {
  const {
    clients: { md },
  } = ctx

  const { wishlistType } = args?.wishlist || {}

  const { email } = await auth(ctx)

  const foundWishlist = await md.searchWistlist('wishlistType', wishlistType)

  const existWishlistName = foundWishlist?.length > 0

  if (existWishlistName) {
    throw new Error(`Already exist wishlist with name ${wishlistType}`)
  }

  const wishlist = {
    ...args?.wishlist,
    email,
  }

  const newWishlist = await md.createWishlist(wishlist)

  return newWishlist
}
