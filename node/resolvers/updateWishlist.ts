import { AuthenticationError } from '@vtex/api'

import { auth } from '../middleware/auth'
import hasSpecialCharacters from '../utils/hasSpecialCharacters'
import type { Products, WishlistUpdateArs } from '../typings/wishlist'

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

  const data = wishlist?.products.map((prod) => {
    const d = products?.find((pro) => pro.ID === prod.ID)

    return {
      ...prod,
      quantityProduct: prod.quantityProduct
        ? prod.quantityProduct
        : d?.quantityProduct ?? 1,
      notes: prod.notes ? prod.notes : d?.notes,
    }
  })

  if (!existWishlist) {
    throw new Error('A wishlist with this id does not exist')
  }

  if (emailUser !== email) {
    throw new AuthenticationError('Unauthorized access')
  }

  const newWishlistType = wishlist?.wishlistType || wishlistType

  if (hasSpecialCharacters(newWishlistType)) {
    throw new Error(
      `An error occurred. No special characters are allowed in the name.`
    )
  }

  const foundWishlist = await md.searchForExistingWishList(
    `wishlistType = "${encodeURIComponent(newWishlistType)}" AND email = ${email}`
  )

  const existWishlistName = foundWishlist && foundWishlist.length > 0

  if (existWishlistName) {
    throw new Error(`A wishlist with the name "${newWishlistType}" already exists.`)
  }

  const updatedWishlist = {
    id,
    email: wishlist?.email || emailUser,
    wishlistType: newWishlistType,
    isPublic: wishlist?.isPublic || isPublic,
    products: data as Products[],
  }

  await md.updateWishlist(wishlist.id, updatedWishlist)

  return {
    id: wishlist.id,
    success: true,
  }
}
