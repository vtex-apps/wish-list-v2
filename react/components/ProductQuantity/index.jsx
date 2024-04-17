import React, { useState, useEffect, useCallback, useRef } from 'react'
import { NumericStepper } from 'vtex.styleguide'
import debounce from 'lodash.debounce'

export const ProductStepper = ({
  initialQty,
  wishlist: initialWishlist,
  productName,
  bundle,
  updateWishlist,
}) => {
  const [QTY, setQTY] = useState(initialQty)
  const wishlistRef = useRef(initialWishlist)

  useEffect(() => {
    setQTY(initialQty)
  }, [initialQty])

  useEffect(() => {
    wishlistRef.current = initialWishlist
  }, [initialWishlist])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdateProducts = useCallback(
    debounce((wishlistId, tempProductName, newQty) => {
      const updatedProducts = wishlistRef.current.products.map((product) =>
        product.nameProduct === tempProductName
          ? { ...product, quantityProduct: newQty }
          : product
      )

      updateWishlist({
        variables: {
          wishlist: {
            id: wishlistId,
            products: updatedProducts,
          },
        },
      }).catch((error) => {
        console.error('Error updating products:', error)
      })
    }, 500),
    []
  )

  useEffect(() => {
    return () => {
      debouncedUpdateProducts.cancel()
    }
  }, [debouncedUpdateProducts])

  const modifyProductQTY = (newValue, eventType) => {
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
    debouncedUpdateProducts(wishlistRef.current.id, productName, finalValue)
  }

  return (
    <NumericStepper
      value={QTY}
      size="small"
      onChange={(e) => {
        modifyProductQTY(e.value, e.type)
      }}
    />
  )
}
