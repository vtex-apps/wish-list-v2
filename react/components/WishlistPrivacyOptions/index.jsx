import React, { useState } from 'react'

import copyToClipboard from '../../utils/copyToClipboard'
import styles from '../../styles.css'

export default function WishlistPrivacyOptions({
  selectedWishlist,
  wishlists,
}) {
  const [textCopied, setTextCopied] = useState(false)

  const linkToCopy =
    typeof window !== 'undefined'
      ? `${window.location.host}/wishlist-share?id=${
          selectedWishlist || wishlists[0].id
        }`
      : ''

  return (
    <div className={`${styles.containerLinkShare} flex items-center`}>
      <button
        className={styles.wishlistCreateNew}
        onClick={() => copyToClipboard(linkToCopy, setTextCopied)}
        id="link_wishlist"
      >
        Share This List
      </button>
      {textCopied && (
        <p className={styles.popupCopy}>Link copied to clipboard!</p>
      )}
    </div>
  )
}
