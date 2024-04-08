import { getWishlist } from './getWishlist'
import { getWishlistsByEmail } from './getWishlistsByEmail'
import { createWishlist } from './createWishlist'
import { updateWishlist } from './updateWishlist'
import { deleteWishlist } from './deleteWishlist'

export const mutations = {
  createWishlist,
  updateWishlist,
  deleteWishlist,
}

export const queries = {
  getWishlist,
  getWishlistsByEmail,
}

export const resolvers = {}
