import formatProductForWishlist from './formatProductForWishlist'
import extractProductData from './extractProductData'

const deleteItemFromWishlist = async ({
  row,
  wishlist,
  selectedWishlist,
  updateWishlist,
}) => {
  const selectedRow = row.rowData

  const wishlistProducts = extractProductData({ items: wishlist.products })
  const wishlistItem = wishlistProducts.find(
    (item: { name: string }) => item.name === selectedRow.name
  )

  const updatedWishlistProducts = wishlistProducts.filter(
    (item: { id: number }) => item.id !== wishlistItem.id
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
