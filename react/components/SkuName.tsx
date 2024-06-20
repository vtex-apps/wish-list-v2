import React from 'react'
import { Spinner } from 'vtex.styleguide'

import useQueryProductByIdentifier from '../hooks/actions/useQueryProductByIdentifier'
import styles from './unitPrice.css'

interface Props {
  itemId: number
  productUrl: string
}

const SkuName = ({ itemId, productUrl }: Props) => {
  const {
    getProperty,
    error: productError,
    loading,
  } = useQueryProductByIdentifier('sku', itemId)

  const Wrapper = ({ children }) => {
    return <div className={`${styles.skuNameContainer}`}>{children}</div>
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
      <a
        href={productUrl || ''}
        className={styles.wishlistProductTexts}
        target="_blank"
        rel="noreferrer"
      >
        {getProperty('productNameWithSkuName')}
      </a>
    </Wrapper>
  )
}

export default SkuName
