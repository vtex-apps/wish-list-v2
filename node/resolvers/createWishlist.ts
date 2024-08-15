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

  const foundWishlist = await md.searchForExistingWishList(
    `wishlistType = "${wishlistType}" AND email = ${email}`
  )

  const existWishlistName = foundWishlist?.length > 0

  if (existWishlistName) {
    throw new Error(`Already exist wishlist with name ${wishlistType}`)
  }

  const wishlist = {
    ...args?.wishlist,
    email,
  }

  return md.createWishlist(wishlist)
}
