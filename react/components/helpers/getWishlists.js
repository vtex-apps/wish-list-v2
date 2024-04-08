import axios from 'axios'

const getWishlists = async (userEmail) => {
  if (!userEmail) {
    console.error('userEmail not found.')

    return null
  }

  try {
    const response = await axios.get(
      `/api/dataentities/whitebird_my_wishlists_wishlist/search?_where=email=${userEmail}&_fields=id,email,wishlistType,products,fieldsConfig,isPublic&_schema=0.0.2-mywishlists`
    )

    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)

    return null
  }
}

export default getWishlists
