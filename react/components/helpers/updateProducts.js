import axios from 'axios'

const updateProducts = async (wishlistId, newProductData) => {
  try {
    await axios.patch(
      `/api/dataentities/whitebird_my_wishlists_wishlist/documents/${wishlistId}`,
      newProductData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error(error)
  }
}

export default updateProducts
