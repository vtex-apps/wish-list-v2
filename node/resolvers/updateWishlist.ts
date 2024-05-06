/* eslint-disable no-console */
import { AuthenticationError } from '@vtex/api'

import { auth } from '../middleware/auth'
import type { Productos, WishlistUpdateArs } from '../typings/wishlist'

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
    products: data as Productos[],
  }

  await md.updateWishlist(wishlist.id, updatedWishlist)

  return {
    id: wishlist.id,
    success: true,
  }
}
