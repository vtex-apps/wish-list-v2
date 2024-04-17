import axios from 'axios'

import extractProductData from './extractProductData'

const getWishlist = async ({
  setWishlist,
  setAllProducts,
  setDisplayedProducts,
  selectedWishlist,
}) => {
  const getWishlistURL = `/api/dataentities/whitebird_my_wishlists_wishlist/documents/${selectedWishlist}?_fields=id,email,wishlistType,products&_schema=0.0.2-mywishlists`

  try {
    const response = await axios.get(getWishlistURL, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    setWishlist(response.data)
    const products = extractProductData({ products: response.data.products })
    const sortedProducts = products.sort((a, b) =>
      a.department.localeCompare(b.department)
    )

    setAllProducts(sortedProducts)
    setDisplayedProducts(sortedProducts)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export default getWishlist
