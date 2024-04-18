import { useContext } from 'react'
import { ToastContext } from 'vtex.styleguide'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { usePixel } from 'vtex.pixel-manager'

import extractProductData from './extractProductData'

const AddProductsToCart = (props, wishlist) => {
  const { addItems } = useOrderItems()
  const { showToast } = useContext(ToastContext)
  const { push } = usePixel()

  const dataExtract = extractProductData(wishlist)
  const infoP = dataExtract.find((item) => props.name === item.name)

  const items = [
    {
      id: infoP.id,
      seller: 1,
      quantity: infoP.qty,
      name: infoP.name,
    },
  ]

  addItems(items)
    .then(async () => {
      push({
        event: 'addToCart',
        id: 'addToCart',
      })
      showToast('Item added to the cart')
    })
    .catch((error) => {
      console.error(error)
    })
}

export default AddProductsToCart
