import React, { useState, useEffect, useRef } from 'react'
import { useMutation } from 'react-apollo'
import { NumericStepper } from 'vtex.styleguide'

import UPDATE_WISHLIST from '../../graphql/mutations/updateWishlist.gql'

export const ProductStepper = ({
  initialQty,
  wishlist: initialWishlist,
  bundle,
  skuReferenceCode,
}) => {
  const [QTY, setQTY] = useState(initialQty)
  const wishlistRef = useRef(initialWishlist)
  const timeoutRef = useRef<number | null>(null)

  const [updateWishlist] = useMutation(UPDATE_WISHLIST)

  useEffect(() => {
    setQTY(initialQty)
  }, [initialQty])

  useEffect(() => {
    wishlistRef.current = initialWishlist
  }, [initialWishlist])

  const modifyProductQTY = (newValue: string, eventType: string) => {
    const quantity = Number(newValue)
    const roundedQuantity =
      eventType === 'change' && bundle
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

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = window.setTimeout(() => {
      updateWishlist({
        variables: {
          wishlist: {
            id: wishlistRef.current.id,
            products: updatedProducts,
            isPublic: true,
            wishlistType: wishlistRef.current.wishlistType,
          },
        },
      }).catch((error: unknown) => {
        console.error('Error updating products:', error)
      })
    }, 700)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

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
