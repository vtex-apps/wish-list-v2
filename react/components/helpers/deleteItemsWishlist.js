import formatProductForWishlist from './formatProductForWishlist'
import extractProductData from './extractProductData'

const deleteItemsWishlist = async (
  props,
  wishlist,
  selectedWishlist,
  updateWishlist
) => {
  const dataExtract = extractProductData(wishlist)
  const productIndex = dataExtract?.find((item) => {
    return props?.rowData?.name === item?.name
  })
  let updatedList = dataExtract?.filter((item) => item?.id !== productIndex?.id)
  updatedList = formatProductForWishlist(updatedList)
  await updateWishlist({
    variables: {
      wishlist: {
        id: selectedWishlist,
        products: updatedList
      }
    }
  })
}

export default deleteItemsWishlist
