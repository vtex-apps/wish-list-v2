import React, { useEffect, useRef, useState } from 'react'
import { useMutation } from 'react-apollo'
import { NumericStepper } from 'vtex.styleguide'

import { useProducts } from '../../context/ProductsContext'
import { useRow } from '../../context/RowContext'
import UPDATE_WISHLIST from '../../graphql/mutations/updateWishlist.gql'

export const ProductStepper = ({ wishlist: initialWishlist }) => {
  const { updateQuantity, row } = useRow()

  const [QTY, setQTY] = useState(row?.quantity ?? 0)
  const { updateQuantityBySkuReferenceCode } = useProducts()
  const wishlistRef = useRef(initialWishlist)
  const timeoutRef = useRef<number | null>(null)

  const [updateWishlist] = useMutation(UPDATE_WISHLIST)

  useEffect(() => {
    wishlistRef.current = initialWishlist
  }, [initialWishlist])

  const modifyProductQTY = (newValue: string, eventType: string) => {
    const quantity = Number(newValue)
    const roundedQuantity =
      eventType === 'change' && row.bundle
        ? Math.max(quantity - (quantity % row.bundle), row.bundle)
        : Math.max(row.bundle, quantity)

    const finalValue = roundedQuantity + (quantity - roundedQuantity)

    const updatedProducts = wishlistRef.current?.products?.map(
      (product: { skuCodeReference: string }) =>
        product.skuCodeReference === row.skuReferenceCode
          ? { ...product, quantityProduct: finalValue }
          : product
    )

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    updateQuantity(finalValue)
    updateQuantityBySkuReferenceCode(row.skuReferenceCode, finalValue)
    setQTY(finalValue)
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
