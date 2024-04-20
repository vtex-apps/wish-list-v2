/* eslint-disable no-console */
import { useContext } from 'react'
import { ToastContext } from 'vtex.styleguide'
import { usePixel } from 'vtex.pixel-manager'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { useOrderForm } from 'vtex.order-manager/OrderForm'

import { extractProductData } from '../components/helpers'

const useAddToCart = () => {
  const { push } = usePixel()
  const { addItems } = useOrderItems()
  const { showToast } = useContext<any>(ToastContext)
  const { orderForm } = useOrderForm()

  const addProductsToCart = (props: { name: string }, wishlist: any) => {
    const productsByOrders = orderForm.items
    const findProductQuantity = productsByOrders?.find(
      (item: { name: string }) => item.name === props.name
    )

    console.log('rowData : ', props)

    const quantityAlreadyAdd = findProductQuantity?.quantity
      ? findProductQuantity?.quantity
      : 0

    console.log('wishlist : ', wishlist)

    const dataExtract = extractProductData({
      items: wishlist?.products?.map((product) => {
        console.log('product : ', product)

        return {
          ...product,
          quantity: Number(product.quantityProduct),
          name: product.nameProduct,
        }
      }),
    })

    console.log('dataExtract : ', dataExtract)

    const productInfo = dataExtract.find(
      (item: { name: string }) => props.name === item.name
    )

    console.log('productInfo : ', productInfo)

    const items = [
      {
        id: productInfo.id,
        seller: 1,
        quantity:
          Number(productInfo.quantity) + Number(quantityAlreadyAdd ?? 0),
        name: productInfo.name,
      },
    ]

    console.log('items : ', items)

    addItems(items)
      .then(async () => {
        push({
          event: 'addToCart',
          id: 'addToCart',
        })
        showToast('Item added to the cart')
      })
      .catch((error: any) => {
        console.error(error)
      })
  }

  return addProductsToCart
}

export default useAddToCart
