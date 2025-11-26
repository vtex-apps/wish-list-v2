import type { WishlistInput } from '../typings/wishlist'
import { auth } from '../middleware/auth'
import hasSpecialCharacters from '../utils/hasSpecialCharacters'

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

  if (hasSpecialCharacters(wishlistType)) {
    throw new Error(
      `An error occurred. No special characters are allowed in the name.`
    )
  }

  const foundWishlist = await md.searchForExistingWishList(
    `wishlistType = "${encodeURIComponent(wishlistType)}" AND email = ${email}`
  )

  const existWishlistName = foundWishlist && foundWishlist.length > 0

  if (existWishlistName) {
    throw new Error(`A wishlist with the name "${wishlistType}" already exists.`)
  }

  const wishlist = {
    ...args?.wishlist,
    email,
  }

  return md.createWishlist(wishlist)
}
