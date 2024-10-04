import { AuthenticationError } from '@vtex/api'

import { auth } from '../middleware/auth'
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

  const { wishlist: wishlistArgs } = args || {}

  if (!wishlistArgs?.id) {
    throw new Error('An id must be provided')
  }

  const {
    email: emailUser,
    id,
    wishlistType,
    isPublic,
    products: productsWishMD,
  } = (await md.getWishlist(wishlistArgs.id)) || {}

  const existWishlist = id

  const skuIds = wishlistArgs.products.map((prod) => prod.ID).join(',')

  const skuResponse = await ctx.clients.product.getProducts(
    skuIds.split(',').map((item) => item.trim())
  )

  const skusWithLinks = skuResponse?.reduce((acc, sku) => {
    acc[sku.productReference] = sku.link

    return acc
  }, {} as Record<string, string>)

  const data = wishlistArgs?.products.map((prodWishArgs) => {
    const matchWishProd = productsWishMD?.find(
      (prod) => prod.ID === prodWishArgs.ID
    )

    return {
      ...prodWishArgs,
      quantityProduct: prodWishArgs.quantityProduct
        ? prodWishArgs.quantityProduct
        : matchWishProd?.quantityProduct ?? 1,
      notes: prodWishArgs.notes ?? matchWishProd?.notes,
      linkProduct: skusWithLinks
        ? skusWithLinks[prodWishArgs.skuCodeReference]
        : `/${prodWishArgs.skuCodeReference}/p`,
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
    email: wishlistArgs?.email || emailUser,
    wishlistType: wishlistArgs?.wishlistType || wishlistType,
    isPublic: wishlistArgs?.isPublic || isPublic,
    products: data as Products[],
  }

  await md.updateWishlist(wishlistArgs.id, updatedWishlist)

  return {
    id: wishlistArgs.id,
    success: true,
  }
}
