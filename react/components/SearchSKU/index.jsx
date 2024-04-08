import React from 'react'
import PropTypes from 'prop-types'

import styles from '../../styles.css'

const SearchSKU = ({
  valueSearchSku,
  changeValueSku,
  getSearchProduct,
  isShowProductSearch,
  searchProduct,
}) => {
  return (
    <div className={styles.wishlistSearchSKUContainer}>
      <label htmlFor="searchInputWishlist">Search SKU</label>
      <input
        id="searchInputWishlist"
        type="text"
        value={valueSearchSku}
        onChange={changeValueSku}
      />
      <button onClick={getSearchProduct}>Buscar</button>

      {isShowProductSearch && (
        <div>
          {searchProduct.map((item) => (
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
