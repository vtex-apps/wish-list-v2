import React from 'react'
import { Spinner } from 'vtex.styleguide'

import useQueryGetProductPrice from '../hooks/actions/useQueryGetProductPrice'
import styles from './productPriceTotal.css'

const ProductPriceTotal = ({
  skuReference = 0,
  productQuantity = 0,
  currency = '$',
}) => {
  const { price, error: productError, loading } = useQueryGetProductPrice(
    'reference',
    skuReference,
    productQuantity
  )

  const handlePrice = () => {
    if (price) {
      return `${currency} ${parseFloat(price).toFixed(2)}`
    }

    return null
  }

  return productError ? (
    <div className={`${styles.productPriceContainer}`}>
      <span>Error</span>
    </div>
  ) : loading ? (
    <div className={`${styles.productPriceContainer}`}>
      <Spinner size={20} />
    </div>
  ) : (
    <div className={`${styles.productPriceContainer}`}>{handlePrice()}</div>
  )
}

export default ProductPriceTotal
