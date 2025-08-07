import React from 'react'
import { Spinner } from 'vtex.styleguide'
import { useIntl } from 'react-intl'

import useQueryProductByIdentifier from '../hooks/actions/useQueryProductByIdentifier'
import styles from './unitPrice.css'

interface Props {
  itemId: number
  productUrl: string
}

const ProductDescription = ({ itemId, productUrl }: Props) => {
  const intl = useIntl()
  const {
    getProperty,
    error: productError,
    loading,
  } = useQueryProductByIdentifier('sku', itemId)

  const Wrapper = ({ children }) => {
    return <div className={`${styles.descriptionContainer}`}>{children}</div>
  }

  return productError ? (
    <Wrapper>
      <span>{intl.formatMessage({ id: 'store/error' })}</span>
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
        {getProperty('productDescription')}
      </a>
    </Wrapper>
  )
}

export default ProductDescription
