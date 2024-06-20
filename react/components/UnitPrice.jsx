import React from 'react'
import { Spinner } from 'vtex.styleguide'

import useQueryGetProductPrice from '../hooks/actions/useQueryGetProductPrice'
import styles from './unitPrice.css'

const UnitPrice = ({ currency = '$', itemId }) => {
  const { price, error: productError, loading } = useQueryGetProductPrice(
    'sku',
    itemId,
    1
  )

  const Wrapper = ({ children }) => {
    return <div className={`${styles.unitPriceContainer}`}>{children}</div>
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
