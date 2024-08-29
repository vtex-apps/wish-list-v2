import React, { useState, useEffect, useRef, useContext } from 'react'
import { NumericStepper, ToastContext } from 'vtex.styleguide'

export const ProductStepper = ({
  initialQty,
  wishlist: initialWishlist,
  bundle,
  updateWishlist,
  skuReferenceCode,
}) => {
  const [QTY, setQTY] = useState(initialQty)
  const wishlistRef = useRef(initialWishlist)

  const { showToast } = useContext<any>(ToastContext)

  useEffect(() => {
    setQTY(initialQty)
  }, [initialQty])

  useEffect(() => {
    wishlistRef.current = initialWishlist
  }, [initialWishlist])

  const modifyProductQTY = (newValue: string, eventType: string) => {
    const quantity = Number(newValue)
    const roundedQuantity =
      eventType === 'change'
        ? Math.max(quantity - (quantity % bundle), bundle)
        : Math.max(bundle, quantity)

    const finalValue = roundedQuantity + (quantity - roundedQuantity)

    setQTY(finalValue)

    const updatedProducts = wishlistRef.current.products.map(
      (product: { skuCodeReference: string }) =>
        product.skuCodeReference === skuReferenceCode
          ? { ...product, quantityProduct: finalValue }
          : product
    )

    updateWishlist({
      variables: {
        wishlist: {
          id: wishlistRef.current.id,
          products: updatedProducts,
        },
      },
    })
      .then(() => {
        showToast('Quantity updated')
      })
      .catch((error: unknown) => {
        console.error('Error updating products:', error)
      })
  }

  return (
 
    <NumericStepper
      value={QTY}
      size="small"
      onChange={(e: { value: string; type: string }) => {
        modifyProductQTY(e.value, e.type)
      }}
    />
 
  )
}
