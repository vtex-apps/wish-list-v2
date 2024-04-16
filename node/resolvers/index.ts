import { getWishlist } from './getWishlist'
import { getWishlistsByEmail } from './getWishlistsByEmail'
import { createWishlist } from './createWishlist'
import { updateWishlist } from './updateWishlist'
import { deleteWishlist } from './deleteWishlist'
import { getPriceBySkuId } from './pricing/getPriceBySkuId'

export const mutations = {
  createWishlist,
  updateWishlist,
  deleteWishlist,
}

export const queries = {
  getWishlist,
  getWishlistsByEmail,
  getPriceBySkuId,
}

export const resolvers = {}
