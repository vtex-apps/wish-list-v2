import React, { useState, useEffect, useRef, useContext } from 'react'
import { NumericStepper, ToastContext } from 'vtex.styleguide'

export const ProductStepper = ({
  initialQty,
  wishlist: initialWishlist,
  productName,
  bundle,
  updateWishlist,
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
    let finalValue = 0 + Number(newValue)

    if (bundle) {
      if (eventType === 'click') {
        if (finalValue < bundle) {
          finalValue = bundle
        } else if (finalValue < QTY) {
          finalValue = QTY - bundle
        } else {
          finalValue = Number(QTY) + Number(bundle)
        }
      }

      if (eventType === 'change') {
        if (finalValue < bundle) {
          finalValue = bundle
        } else {
          finalValue -= finalValue % bundle
        }
      }
    }

    setQTY(finalValue)

    const updatedProducts = wishlistRef.current.products.map(
      (product: { nameProduct: string }) =>
        product.nameProduct === productName
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
      .catch((error: any) => {
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
