import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import copyToClipboard from '../../utils/copyToClipboard'
import styles from '../../styles.css'

export default function WishlistPrivacyOptions({
  selectedWishlist,
  wishlists,
  buttonLabel,
}) {
  const intl = useIntl()
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
        {buttonLabel}
      </button>
      {textCopied && (
        <p className={styles.popupCopy}>{intl.formatMessage({ id: 'store/link-copied-to-clipboard' })}</p>
      )}
    </div>
  )
}
