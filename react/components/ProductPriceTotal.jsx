import React, { useEffect } from "react"
import { Spinner } from 'vtex.styleguide'
import useQueryGetProductPrice from '../hooks/actions/useQueryGetProductPrice'

import styles from './productPriceTotal.css'

const ProductPriceTotal = ({ skuReference = 0, productQuantity = 0, currency = '$' }) => {

  const { refetch, data, error: productError, loading } = useQueryGetProductPrice('reference', skuReference)

  useEffect(() => {
    refetch()
  }, [productQuantity])

  const price = (data?.product.items ?? []).find((item) => item)?.sellers?.find((seller) => seller)?.commertialOffer?.Price;

  const handlePrice = () => {
    if (productQuantity && price) {
      const lineTotal = productQuantity * price
      return `${currency} ${price ? parseFloat(lineTotal).toFixed(2) : null}`
    }
  }

  if (productError) {
    return (
      <div className={`${styles.productPriceContainer}`}>
        <span>Error</span>
      </div>)
  }

  if (loading) {
    return (
      <div className={`${styles.productPriceContainer}`}>
        <Spinner size={20} />
      </div>
    )
  }

  return (
    <div className={`${styles.productPriceContainer}`}>
      {handlePrice()}
    </div>
  )
}

export default ProductPriceTotal
