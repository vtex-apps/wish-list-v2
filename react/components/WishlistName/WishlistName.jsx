import React, { useState, useEffect, useContext, useRef } from 'react'
import { useMutation } from 'react-apollo'
import { IconEdit, ToastContext } from 'vtex.styleguide'

import styles from '../../styles.css'
import UPDATE_WISHLIST from '../../graphql/mutations/updateWishlist.gql'

function EditableWishlistTitle({ initialTitle, wishlist, fetchData }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(initialTitle || '')
  const { showToast } = useContext(ToastContext)
  const lastSavedTitle = useRef(initialTitle || '')

  const [updateWishlist] = useMutation(UPDATE_WISHLIST, {
    onCompleted: () => {
      lastSavedTitle.current = title
      fetchData()
    },
    onError: (error) => {
      showToast({
        message:
          error?.message?.replace('GraphQL error: ', '') ??
          `An error occurred. Make sure there isn't a wishlist with the same name.`,
        status: 'ERROR',
      })
      console.error(error)
      setTitle(lastSavedTitle.current)
      setIsEditing(false)
    },
  })

  useEffect(() => {
    if (initialTitle) {
      setTitle(initialTitle)
      lastSavedTitle.current = initialTitle
    }
  }, [initialTitle])

  const handleEditClick = () => setIsEditing(true)

  const handleSaveClick = () => {
    setIsEditing(false)
    updateWishlist({
      variables: {
        wishlist: {
          id: wishlist.id,
          wishlistType: title,
          products: wishlist.products,
          isPublic: true,
        },
      },
    })
  }

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.titleWishlistName}
          />
          <button
            className={styles.buttonWishlistName}
            onClick={handleSaveClick}
          >
            Save
          </button>
        </div>
      ) : (
        <div
          className={styles.wishlistNameContainer}
          aria-hidden="true"
        >
          <h1
            className={styles.wishlistName}
            onClick={handleEditClick}
          >
            {title} {title && <IconEdit />}
          </h1>
        </div>
      )}
    </div>
  )
}

export default EditableWishlistTitle
