import { useContext } from 'react'
import { ToastContext } from 'vtex.styleguide'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { useRuntime } from 'vtex.render-runtime'

import handleDataLayerEvent from '../utils/handleDataLayerEvent'
import mapProductDataToEvent from '../utils/mapProductDataToEvent'
import {
  extractProductData,
  formatProductForWishlist,
} from '../components/helpers'

// wishlist button in my-account, used to add the product from the table row to the cart
const useBulkAction = ({
  wishlist,
  selectedWishlist,
  setUpdatedSelectedRows,
  updateWishlist,
}) => {
  const { addItems } = useOrderItems()
  const { showToast } = useContext(ToastContext)

  const runtime = useRuntime()
  const { culture } = runtime
  const { currency } = culture

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
        const productDataToEvent = await mapProductDataToEvent(
          selectedRows,
          currency
        )

        addItems(itemsToAdd)
          .then(() => {
            handleDataLayerEvent('addToCart', productDataToEvent)
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
    updateWishlist({
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
