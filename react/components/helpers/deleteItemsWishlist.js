import formatProductForWishlist from './formatProductForWishlist'
import extractProductData from './extractProductData'

const deleteItemFromWishlist = async ({
  row,
  wishlist,
  selectedWishlist,
  updateWishlist,
}) => {
  const wishlistProducts = extractProductData({ items: wishlist.products })
  const wishlistItem = wishlistProducts.find((item) => item.name === row.name)

  const updatedWishlistProducts = wishlistProducts.filter(
    (item) => item.id !== wishlistItem.id
  )

  const formattedWishlistProducts = formatProductForWishlist(
    updatedWishlistProducts
  )

  await updateWishlist({
    variables: {
      wishlist: {
        id: selectedWishlist,
        products: formattedWishlistProducts,
      },
    },
  })
}

export default deleteItemFromWishlist
