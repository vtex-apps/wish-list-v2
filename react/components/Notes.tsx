import React, { useState, useEffect, useRef, useContext } from 'react'
import { Modal, ToastContext } from 'vtex.styleguide'
import { useIntl } from 'react-intl'

import { NoteIcon } from './Icons'
import styles from './notes.css'
import useQueryGetProductPrice from '../hooks/actions/useQueryGetProductPrice'

const Notes = ({
  wishlist: initialWishlist,
  updateWishlist,
  skuReference,
  currentNotes,
  productName,
  productImage,
  partNumber,
  currency,
  itemId,
  quantity,
}) => {
  const intl = useIntl()
  const [show, setShow] = useState(false)
  const [notes, setNotes] = useState('')

  const { price } = useQueryGetProductPrice(
    'sku',
    itemId,
    quantity ? parseInt(quantity, 10) : 1
  )

  const wishlistRef = useRef(initialWishlist)

  const { showToast } = useContext<any>(ToastContext)

  useEffect(() => {
    wishlistRef.current = initialWishlist
  }, [initialWishlist])

  useEffect(() => {
    setNotes(currentNotes)
  }, [currentNotes])

  const handleNotesSubmit = async () => {
    try {
      const updatedProducts = wishlistRef.current.products?.map(
        (product: { skuCodeReference: any }) => ({
          ...product,
          ...(product.skuCodeReference === skuReference ? { notes } : {}),
        })
      )

      await updateWishlist({
        variables: {
          wishlist: {
            id: wishlistRef.current.id,
            products: updatedProducts,
          },
        },
      })

      showToast(intl.formatMessage({ id: 'store/notes-saved-successfully' }))
      setShow(false)
    } catch (error) {
      showToast(intl.formatMessage({ id: 'store/error-saving-notes' }))
      console.error('Notes submit error: ', error)
    }
  }

  const formattedValue = `${currency} ${price.toFixed(2)}`

  return (
    <div className={`${styles.notesContainer}`}>
      <div
        className={`${styles.addNotesIcons}`}
        onClick={() => setShow(!show)}
        aria-hidden="true"
      >
        <NoteIcon />
      </div>

      <Modal
        isOpen={show}
        onClose={() => setShow(false)}
        title={intl.formatMessage({ id: 'store/add-note' })}
        className="w-100 hhh"
      >
        <div className={`${styles.notesModalContainer}`}>
          <div className={`${styles.productSummary}`}>
            <div className={`${styles.productSummaryImageContainer}`}>
              <img
                className={`${styles.productSummaryImage}`}
                src={productImage}
                alt={productName}
                width="74px"
                height="64px"
              />
            </div>
            <div className={`${styles.productSummaryInfo}`}>
              <div className={`${styles.productSummaryInfoName}`}>
                <span>{productName}</span>
              </div>
              <div className={`${styles.productSummaryInfoDetails}`}>
                <div
                  className={`${styles.productSummaryInfoDetailsPartNumber}`}
                >
                  <span>{intl.formatMessage({ id: 'store/part-number' })}: {partNumber}</span>
                </div>
                <div className={`${styles.productSummaryInfoDetailsPrice}`}>
                  <span>{intl.formatMessage({ id: 'store/price' })}: {formattedValue}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <span
              className={`${styles.notesModalTitle} f3 db lh-copy measure flex items-center`}
            >
              {intl.formatMessage({ id: 'store/note' })}
            </span>
          </div>
          <textarea
            className="w-100 pa4"
            id="wish-list-notes"
            name="wish-list-notes"
            rows={8}
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
          />
          <div className={`${styles.notesButtonContainer}`}>
            <div className={`${styles.notesCancelButtonContainer}`}>
              <button
                className={`${styles.notesCancelButton}`}
                onClick={() => setShow(false)}
              >
                {intl.formatMessage({ id: 'store/cancel' })}
              </button>
            </div>
            <div className={`${styles.notesSubmitButtonContainer}`}>
              <button
                className={`${styles.notesSubmitButton}`}
                onClick={() => handleNotesSubmit()}
              >
                {intl.formatMessage({ id: 'store/save' })}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Notes
