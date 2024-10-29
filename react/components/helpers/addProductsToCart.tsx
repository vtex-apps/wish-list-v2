import { useContext } from 'react'
import { ToastContext } from 'vtex.styleguide'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { usePixel } from 'vtex.pixel-manager'

import extractProductData from './extractProductData'

// function not used in the project
const AddProductToCart = ({ name }, wishlist) => {
  const { addItems } = useOrderItems()
  const { showToast } = useContext<any>(ToastContext)
  const { push } = usePixel()

  const data = extractProductData({ items: wishlist.products })
  const product = data.find((item) => name === item.name)

  if (!product) return

  const item = {
    id: product.id,
    seller: 1,
    quantity: product.quantity,
    name: product.name,
  }

  addItems([item])
    .then(async () => {
      push({ event: 'addToCart', id: 'addToCart' })
      showToast('Item added to the cart')
    })
    .catch((error) => console.error(error))
}

export default AddProductToCart
