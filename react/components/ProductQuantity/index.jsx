import { useState, useEffect, useCallback, useRef } from 'react'
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

  const debouncedUpdateProducts = useCallback(
    debounce((wishlistId, productName, newQty) => {
      // eslint-disable-next-line
      const updatedProducts = wishlistRef?.current?.products?.map((product) =>
        product?.nameProduct === productName
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
    let finalValue = 0 + newValue

    if (bundle) {
      if (eventType === 'click') {
        if (finalValue < bundle) {
          finalValue = bundle
        } else if (finalValue < QTY) {
          finalValue = QTY - bundle
        } else {
          finalValue = QTY + bundle
        }
      }

      if (eventType === 'change') {
        if (finalValue < bundle) {
          finalValue = bundle
        } else {
          finalValue = finalValue - (finalValue % bundle)
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
