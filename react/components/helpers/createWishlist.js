import axios from 'axios'

const createWishlist = async (
  emailInfo,
  nameListWishlist,
  getList,
  products = []
) => {
  const urlCreate =
    '/api/dataentities/whitebird_my_wishlists_wishlist/documents?_schema=0.0.2-mywishlists'

  try {
    await axios.post(urlCreate, {
      email: emailInfo,
      wishlistType: nameListWishlist,
      isPublic: false,
      products,
    })

    setTimeout(getList, 1000)
  } catch (error) {
    console.error('error:', error)
  }
}

export default createWishlist
