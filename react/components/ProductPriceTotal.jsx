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

  const handlePrice = () =>
    price ? `${currency} ${parseFloat(price).toFixed(2)}` : null

  const Wrapper = ({ children }) => {
    return <div className={`${styles.productPriceContainer}`}>{children}</div>
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
    <Wrapper>{handlePrice()}</Wrapper>
  )
}

export default ProductPriceTotal
