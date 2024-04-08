import { useContext } from 'react'
import { ToastContext } from 'vtex.styleguide'
import { extractProductData } from '../components/helpers'
import { usePixel } from 'vtex.pixel-manager'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { useOrderForm } from 'vtex.order-manager/OrderForm'

const useAddToCart = () => {
  const { push } = usePixel()
  const { addItems } = useOrderItems()
  const { showToast } = useContext(ToastContext)
  const { orderForm } = useOrderForm()

  const addProductsToCart = (props, wishlist) => {

    const productsByOrders = orderForm.items
    const findProductQuantity = productsByOrders.find((item) => item?.name == props?.name)
    const quantityAlreadyAdd = findProductQuantity?.quantity ? findProductQuantity?.quantity : 0
    const dataExtract = extractProductData(wishlist)

    const productInfo = dataExtract?.find((item) => props?.name === item?.name)

    const items = [
      {
        id: productInfo.id,
        seller: 1,
        quantity: productInfo.qty + quantityAlreadyAdd,
        name: productInfo.name,
      },
    ]

    try {
      addItems(items).then(async () => {
        push({
          event: 'addToCart',
          id: 'addToCart',
        })
        showToast('Item added to the cart')
      })
    } catch (error) {
      console.error(error)
    }
  }

  return addProductsToCart
}

export default useAddToCart
