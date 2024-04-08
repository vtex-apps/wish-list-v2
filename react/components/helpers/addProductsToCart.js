/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'react'
import { ToastContext } from 'vtex.styleguide'
import { useOrderItems } from 'vtex.order-items/OrderItems'

import extractProductData from './extractProductData'

const addProductsToCart = (props, wishlist) => {
  const { addItems } = useOrderItems()
  const { showToast } = useContext(ToastContext)

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

  try {
    addItems(items).then(async () => {
      // eslint-disable-next-line no-undef
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

export default addProductsToCart
