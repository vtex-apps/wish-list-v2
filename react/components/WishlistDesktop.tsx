import React from 'react'

import EditableWishlistTitle from './WishlistName/WishlistName'
import ModalCreateList from './ModalCreateList'
import WishlistPrivacyOptions from './WishlistPrivacyOptions'
import styles from '../styles.css'

const WishlistDesktop = ({
  selectedWishlist,
  wishlists,
  wishlist,
  fetchData,
  handleSelectWishlist,
  emailIDInfo,
  buttonModalTable,
  isModalAccountTable,
  handleSubmitDataTable,
  createWishlist,
  setFieldValidationTable,
  nameListAccountTable,
  setNameListAccountTable,
  setIsModalAccountTable,
  deleteWishlist,
  buttonCloseModalTable,
  handleNameListTable,
  fieldValidationTable,
}) => {
  return (
    <div id="wish-list-desktop">
      <EditableWishlistTitle
        initialTitle={selectedWishlist !== null ? wishlist.wishlistType : ''}
        wishlistId={
          selectedWishlist !== null ? selectedWishlist : wishlists[0].id
        }
        wishlist={selectedWishlist !== null ? wishlist : wishlists[0]}
        fetchData={fetchData}
      />
      <div className={styles.wishlistOptionsContainer}>
        <div className={styles.wishlistSelector}>
          <p className={styles.wishlistSelectListOneText}>Favourites List</p>
          <select
            className={styles.wishlistSelectListOne}
            id="selectListTable"
            onChange={(e) => {
              handleSelectWishlist(e.target.value)
            }}
            size={1}
            value={selectedWishlist}
          >
            <option value="" disabled selected>
              Select an option
            </option>
            {emailIDInfo.map((newDates) => (
              <option
                className={styles.wishlistSelectListOneOption}
                value={newDates.value}
                key={newDates.value}
                id={newDates.value}
              >
                {newDates.label}
              </option>
            ))}
          </select>
        </div>
        <section className={styles.wishlistCreationOptions}>
          <button
            className={`${styles.wishlistCreateNew} ${styles.wishlistCreateNewHelper}`}
            onClick={buttonModalTable}
          >
            Create New List
          </button>
          {isModalAccountTable && (
            <ModalCreateList
              buttonCloseModal={buttonCloseModalTable}
              handleNameList={handleNameListTable}
              fieldValidation={fieldValidationTable}
              handleSubmitData={(event) =>
                handleSubmitDataTable({
                  event,
                  createWishlist,
                  setFieldValidationTable,
                  nameListAccountTable,
                  setNameListAccountTable,
                  setIsModalAccountTable,
                })
              }
            />
          )}
          <WishlistPrivacyOptions
            selectedWishlist={
              selectedWishlist !== null ? selectedWishlist : wishlists[0].id
            }
            wishlists={wishlists}
            buttonLabel="Share This List"
          />
          <button
            className={styles.wishlistDeleteWishList}
            onClick={() => deleteWishlist()}
          >
            Delete Selected List
          </button>
        </section>
      </div>
    </div>
  )
}

export default WishlistDesktop
