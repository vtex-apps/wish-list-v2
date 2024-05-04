import React from 'react'
import { Spinner } from 'vtex.styleguide'

import useQueryGetProductPrice from '../hooks/actions/useQueryGetProductPrice'
import styles from './unitPrice.css'

const UnitPrice = ({ skuReference = 0, currency = '$' }) => {
  const { price, error: productError, loading } = useQueryGetProductPrice(
    'reference',
    skuReference,
    1
  )

  const Wrapper = ({ children }) => {
    return (
      <div className={`${styles.unitPriceContainer}`}>
        {children}
      </div>
    )
  }

  return productError ? (
    <Wrapper>
      <span>Error</span>
    </Wrapper>
  ) : loading ? (
    <Wrapper>
      <Spinner size={20} />
    </Wrapper>
  ) : (
    <Wrapper>
      {`${currency} ${price ? parseFloat(price).toFixed(2) : null}`}
    </Wrapper>
  )
}

export default UnitPrice
