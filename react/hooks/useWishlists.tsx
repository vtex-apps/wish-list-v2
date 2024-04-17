import { useRuntime } from 'vtex.render-runtime'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useProduct } from 'vtex.product-context'

const useWishList = () => {
  const { navigate } = useRuntime()
  const { orderForm } = useOrderForm()
  const { product, selectedQuantity, selectedItem } = useProduct()

  const emailInfo = orderForm?.clientProfileData?.email
  const isLoggedIn =
    orderForm?.loggedIn ||
    (orderForm?.userType === 'CALL_CENTER_OPERATOR' && emailInfo != null)

  const nameProduct = product?.productName
  const linkProduct = product?.link
  const idProduct = Number(selectedItem?.itemId)
  const urlImageProduct = product?.items[0]?.images[0]?.imageUrl
  const quantityProduct = selectedQuantity
  const price = Number(product?.priceRange?.sellingPrice?.highPrice)
  const skuCodeReference = product?.items[0]?.referenceId?.[0]?.Value
  const departmentArray = product?.categoryTree
  const department = departmentArray?.[0]?.name

  return {
    navigate,
    emailInfo,
    isLoggedIn,
    nameProduct,
    linkProduct,
    idProduct,
    urlImageProduct,
    quantityProduct,
    price,
    skuCodeReference,
    department,
  }
}

export default useWishList
