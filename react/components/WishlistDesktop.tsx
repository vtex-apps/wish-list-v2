import React, { useState, useContext } from 'react'
import { ToastContext, ModalDialog, Button } from 'vtex.styleguide'

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
  isDeleting,
}) => {
  const [isCreateLoading, setIsCreateLoading] = useState(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { showToast } = useContext<any>(ToastContext)

  const onCreateList = async (event) => {
    setIsCreateLoading(true)
    try {
      await handleSubmitDataTable({
        event,
        createWishlist,
        setFieldValidationTable,
        nameListAccountTable,
        setNameListAccountTable,
        setIsModalAccountTable,
      })
      showToast('You created a new Wishlist')
      setIsCreateLoading(false)
    } catch (error) {

      showToast({message: `An error occurred. Make sure there isn't a wishlist with the same name.`,  status: 'ERROR',})

      console.error(error)
      await fetchData()
      setIsCreateLoading(false)
    }
  }

  const onDeleteList = async () => {

    setIsDeleteLoading(true)
    try {
      await deleteWishlist()
      setIsDeleteLoading(false)
      if(wishlists.length === 1){
        window.location.reload()
      }
      closeModal()
    } catch (error) {
      console.error(error)
      await fetchData()
      setIsDeleteLoading(false)
      closeModal()
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  return (
    <div id="wish-list-desktop">
      
      <ModalDialog
        centered
        loading={isDeleteLoading}
        confirmation={{
          onClick: onDeleteList,
          label: 'Yes',
          isDangerous: true,
          testId: "deleteConfirmBtn"

        }}
        cancelation={{
          onClick: closeModal,
          label: 'Cancel',
        }}
        isOpen={isModalOpen}
        onClose={closeModal}>
        <div className="">
          <p className="f3 f3-ns fw3 gray">
            Are you sure you want to delete your wishlist {emailIDInfo.find( list => list.value == selectedWishlist)?.label} ?
          </p>
          <p>
            This action is irreversible.
          </p>
        </div>
      </ModalDialog>

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
        <section className={`${styles.wishlistCreationOptions} relative`}>
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
              handleSubmitData={onCreateList}
              isButtonLoading={isCreateLoading}
              blockClass="vtex-create-wishlist-desktop"
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
            onClick={openModal}
            disabled={isDeleteLoading}
          >
            {isDeleting ? `Deleting...` : `Delete Selected List`}
          </button>
        </section>
      </div>
    </div>
   
  )
}

export default WishlistDesktop
