import React, { useEffect } from "react"
import { Spinner } from 'vtex.styleguide'
import useQueryGetProductPrice from '../hooks/actions/useQueryGetProductPrice'

import styles from './unitPrice.css'

const UnitPrice = ({ skuReference = 0, currency = '$' }) => {

  const { data, error: productError, loading } = useQueryGetProductPrice('reference', skuReference)

  const price = (data?.product.items ?? []).find((item) => item)?.sellers?.find((seller) => seller)?.commertialOffer?.Price;

  if (productError) {
    return (
      <div className={`${styles.unitPriceContainer}`}>
        <span>Error</span>
      </div>)
  }

  if (loading) {
    return (
      <div className={`${styles.unitPriceContainer}`}>
        <Spinner size={20} />
      </div>
    )
  }

  return (
    <div className={`${styles.unitPriceContainer}`}>
      {`${currency} ${price ? parseFloat(price).toFixed(2) : null}`}
    </div>
  )
}

export default UnitPrice
