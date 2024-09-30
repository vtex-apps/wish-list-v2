import type { WishlistInput } from '../typings/wishlist'
import { auth } from '../middleware/auth'

function hasSpecialCharacters(str: string) {
  const specialCharactersRegex = /[!@$%^*(),.?":{}|<>]/g

  return specialCharactersRegex.test(str)
}

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
    throw new Error(`Already exist wishlist with name ${wishlistType}`)
  }

  const wishlist = {
    ...args?.wishlist,
    email,
  }

  return md.createWishlist(wishlist)
}
