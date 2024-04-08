/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react'
import { useMutation } from 'react-apollo'
import { IconEdit } from 'vtex.styleguide'

import styles from '../../styles.css'
import UPDATE_WISHLIST from '../../graphql/mutations/updateWishlist.gql'

function EditableWishlistTitle({ initialTitle, wishlist, fetchData }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(initialTitle || 'Default name')
  const [updateWishlist] = useMutation(UPDATE_WISHLIST, {
    variables: {
      wishlist: {
        id: wishlist.id,
        wishlistType: title,
        products: wishlist.products,
        isPublic: true,
      },
    },
    onCompleted: () => {
      fetchData()
    },
  })

  useEffect(() => {
    setTitle(initialTitle)
  }, [initialTitle])

  const handleEditClick = () => setIsEditing(true)

  const handleSaveClick = () => {
    setIsEditing(false)
    updateWishlist()
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
        <div className={styles.wishlistNameContainer}>
          <h1 className={styles.wishlistName} onClick={handleEditClick}>
            {title} {title && <IconEdit />}
          </h1>
        </div>
      )}
    </div>
  )
}

export default EditableWishlistTitle
