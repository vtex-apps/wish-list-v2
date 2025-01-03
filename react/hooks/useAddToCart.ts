import { useContext } from 'react'
import { ToastContext } from 'vtex.styleguide'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { useOrderForm } from 'vtex.order-manager/OrderForm'

import { extractProductData } from '../components/helpers'
import handleDataLayerEvent from '../utils/handleDataLayerEvent'
import { WishlistMD } from '../interfaces'

const useAddToCart = () => {
  const { addItems } = useOrderItems()
  const { showToast } = useContext<any>(ToastContext)
  const { orderForm } = useOrderForm()

  // hook used to add several products from the wishlist table to the cart
  const addProductsToCart = (
    props: { name: string; itemId: number; quantity?: number },
    wishlist: WishlistMD
  ) => {
    const productsByOrders = orderForm.items
    const findProductQuantity = productsByOrders?.find(
      (item: { id: string }) => Number(item.id) === props.itemId
    )

    const quantityAlreadyAdd = findProductQuantity?.quantity
      ? findProductQuantity?.quantity
      : 0

    const dataExtract = extractProductData({
      items: wishlist?.products?.map((product) => {
        return {
          ...product,
          quantity: Number(product.quantityProduct),
          name: product.nameProduct,
        }
      }),
    })

    const productInfo = dataExtract.find(
      (item: { id: string }) => props.itemId === Number(item.id)
    )

    const quantityToAdd = props.quantity ?? Number(productInfo.quantity)
    const items = [
      {
        id: productInfo.id,
        seller: 1,
        quantity: quantityToAdd + Number(quantityAlreadyAdd ?? 0),
        name: productInfo.name,
      },
    ]

    if (items.length === 0) return

    addItems(items)
      .then(() => {
        handleDataLayerEvent('addToCart', [productInfo])
        showToast('Item added to the cart')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return addProductsToCart
}

export default useAddToCart
