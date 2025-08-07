import React from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'

import styles from '../../styles.css'

interface Item {
  productId: string
  items: Array<{
    images: Array<{
      imageUrl: string
      imageText: string
    }>
    referenceId: Array<{ Value: string }>
  }>
}

const SearchSKU = ({
  valueSearchSku,
  changeValueSku,
  getSearchProduct,
  isShowProductSearch,
  searchProduct,
}) => {
  const intl = useIntl()
  return (
    <div className={styles.wishlistSearchSKUContainer}>
      <label htmlFor="searchInputWishlist">{intl.formatMessage({ id: 'store/search-sku' })}</label>
      <input
        id="searchInputWishlist"
        type="text"
        value={valueSearchSku}
        onChange={changeValueSku}
      />
      <button onClick={getSearchProduct}>{intl.formatMessage({ id: 'store/search' })}</button>

      {isShowProductSearch && (
        <div>
          {searchProduct.map((item: Item) => (
            <div
              key={item.productId}
              id={item.productId}
              style={{ display: 'flex', flexDirection: 'row' }}
            >
              <img
                src={item.items[0].images[0].imageUrl}
                alt={item.items[0].images[0].imageText}
                width={50}
                height={50}
              />
              <p>{item.items[0].referenceId[0].Value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

SearchSKU.propTypes = {
  valueSearchSku: PropTypes.string,
  isShowProductSearch: PropTypes.bool,
  searchProduct: PropTypes.array,
  changeValueSku: PropTypes.func,
  getSearchProduct: PropTypes.func,
}

export default SearchSKU
