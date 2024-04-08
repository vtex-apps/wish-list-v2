import axios from 'axios'

const deleteWishlist = async (wishlistId, getWishlists, setIsDeleting) => {
  setIsDeleting(true)

  try {
    await axios.delete(
      `/api/dataentities/whitebird_my_wishlists_wishlist/documents/${wishlistId}?_schema=0.0.2-mywishlists`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    getWishlists()
  } catch (error) {
    console.error('Error:', error)
  } finally {
    setIsDeleting(false)
  }
}

export default deleteWishlist
