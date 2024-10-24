import { useContext } from 'react'
import { ToastContext } from 'vtex.styleguide'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { usePixel } from 'vtex.pixel-manager'

import {
  extractProductData,
  formatProductForWishlist,
} from '../components/helpers'

const useBulkAction = ({
  wishlist,
  selectedWishlist,
  setUpdatedSelectedRows,
  updateWishlist,
}) => {
  const { push } = usePixel()
  const { addItems } = useOrderItems()
  const { showToast } = useContext(ToastContext)

  const handleBulkAction = async (selectedRows, actionId) => {
    if (actionId === 'addToCart') {
      const dataExtract = extractProductData({ items: wishlist.products })
      const itemsToAdd = selectedRows.map((row) => {
        const productDetails = dataExtract.find(
          (item) => row.name === item.name
        )

        return {
          id: Number(productDetails.id),
          seller: 1,
          quantity: productDetails.quantity,
          name: productDetails.name,
        }
      })

      if (itemsToAdd.length > 0) {
        addItems(itemsToAdd)
          .then(() => {
            push({
              event: 'addToCart',
              id: 'addToCart',
              items: selectedRows,
            })
            showToast('Items added to the cart')
          })
          .catch((error) => {
            console.error(error)
          })
      }
    }

    if (actionId !== 'deleteRowsWishlist') {
      return
    }

    const dataExtract = extractProductData({ items: wishlist.products })
    const itemsToDelete = selectedRows.map((row) => {
      const selectedProduct = dataExtract.find((item) => {
        return row.name === item.name
      })

      return selectedProduct.id
    })

    let updatedList = dataExtract.filter(
      (item) => !itemsToDelete.includes(item.id)
    )

    updatedList = formatProductForWishlist(updatedList)
    setUpdatedSelectedRows((prevSelectedRows) =>
      prevSelectedRows.filter((row) => !selectedRows.includes(row))
    )
    await updateWishlist({
      variables: {
        wishlist: {
          id: selectedWishlist,
          products: updatedList,
        },
      },
    })
  }

  return handleBulkAction
}

export default useBulkAction
