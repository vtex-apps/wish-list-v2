// Hooks
import React, { useEffect, useState } from 'react'
import { Spinner, Button } from 'vtex.styleguide'
import { useMutation } from 'react-apollo'

import useCreateListAccount from '../hooks/useCreateListAccount'
// Global Store
import useStoreGlobal from '../globalStore/globalStore'
// Components
import Wishlist from './Wishlist'
import ModalCreateList from './ModalCreateList'
// Helpers
import useQueryWishlists from '../hooks/actions/useQueryWishlists'
// Styles
import styles from '../styles.css'
// GQL
import CREATE_WISHLIST from '../mutation/createWishList.gql'

const MyWishLists = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPage, setIsLoadingPage] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { setSelectedWishlist, selectedWishlist } = useStoreGlobal()
  const setWishlists = useStoreGlobal((state) => state.setWishlists)
  const wishlists = useStoreGlobal((state) => state.wishlists)

  const { data, loading, refetch, error } = useQueryWishlists()

  const [createNewListMutaion] = useMutation(CREATE_WISHLIST, {})

  const {
    isModalAccount,
    nameListAccount,
    fieldValidation,
    setNameListAccount,
    setFieldValidation,
    setIsModalAccount,
    buttonModal,
    buttonCloseModal,
    handleNameList,
  } = useCreateListAccount()

  useEffect(() => {
    if (data?.getWishlistsByEmail) {
      if (data.getWishlistsByEmail.length > 0) {
        setWishlists(data.getWishlistsByEmail)
        if (!selectedWishlist) {
          setSelectedWishlist(data.getWishlistsByEmail[0].id)
        }
      } else {
        setWishlists([])
      }
    }

    if (error) {
      setErrorMessage(error.message)
    } else {
      setErrorMessage('Error')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error])

  useEffect(() => {
    wishlists && setIsLoadingPage(loading)
  }, [loading, wishlists])

  // Create list post
  const handleSubmitData = (event: { preventDefault: () => void }) => {
    event.preventDefault()

    if (nameListAccount.trim() === '') {
      setFieldValidation('The field cannot be empty')
    } else {
      setIsLoading(true)
      createNewListMutaion({
        variables: {
          wishList: {
            wishlistType: nameListAccount,
            products: [],
            isPublic: false,
          },
        },
      })
        .then(refetch)
        .then(() => {
          setNameListAccount('')
          setFieldValidation('')
          setIsModalAccount(false)
          setIsLoading(false)
        })
        .catch((errorSubmit) => {
          console.error(errorSubmit)
          setNameListAccount('')
          setFieldValidation('')
          setIsModalAccount(false)
          setIsLoading(false)
        })
    }
  }

  const handleCloseButton = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    buttonCloseModal()
  }

  if (errorMessage)
    return (
      <p className={styles.errorMessage}>
        Could not find the wishlists: {errorMessage}
      </p>
    )

  if (isLoadingPage) return <Spinner />

  if (wishlists.length === 0) {
    return (
      <section className={styles.wishlistCreateWishlistUI}>
        <Button href="/account">RETURN</Button>
        <h1 className={styles.wishlistCreateWishlistPageTitle}>
          Create your wishlist!
        </h1>
        <button className={styles.wishlistCreateNew} onClick={buttonModal}>
          New Wishlist
        </button>
        {isModalAccount && (
          <ModalCreateList
            buttonCloseModal={handleCloseButton}
            handleNameList={handleNameList}
            fieldValidation={fieldValidation}
            handleSubmitData={handleSubmitData}
            blockClass="vtex-create-wishlist-main"
            isButtonLoading={isLoading}
          />
        )}
      </section>
    )
  }

  return <Wishlist wishlists={wishlists} fetchData={refetch} />
}

export default MyWishLists
