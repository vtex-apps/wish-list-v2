import { useState, useEffect, useRef, useContext } from 'react'
import { Modal, ToastContext } from 'vtex.styleguide'

import styles from './notes.css'

const Notes = ({
  wishlist: initialWishlist,
  updateWishlist,
  skuReference,
  currentNotes
}) => {

  const [show, setShow] = useState(false)
  const [notes, setNotes] = useState('')

  const wishlistRef = useRef(initialWishlist)

  const { showToast } = useContext(ToastContext)

  useEffect(() => {
    if (currentNotes) {
      setNotes(currentNotes)
    }
  }, [])

  useEffect(() => {
    wishlistRef.current = initialWishlist
  }, [initialWishlist])

  const handleNotesSubmit = async () => {
    try {
      const updatedProducts = wishlistRef?.current?.products?.map((product) => {
        if (product?.skuCodeReference === skuReference) {
          product.notes = notes
          return product
        }
        return product
      }
      )

     await updateWishlist({
        variables: {
          wishlist: {
            id: wishlistRef.current.id,
            products: updatedProducts,
          },
        },
      }).then(() => {
        showToast('Notes saved successfully!')
      }).catch((error) => {
        showToast('Error saving notes!')
        console.error('Error updating products: ', error)
      })

      setTimeout(function(){
        setShow(false)
      }, 3000);

    } catch (error) {
      console.error('Notes submit error: '.error)
    }
  }

  return (
    <div className='w-100'>
      <div className={`${styles.addNotesIcons}`} onClick={() => setShow(!show)}>
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 8.25V18C20 21 18.21 22 16 22H8C5.79 22 4 21 4 18V8.25C4 5 5.79 4.25 8 4.25C8 4.87 8.24997 5.43 8.65997 5.84C9.06997 6.25 9.63 6.5 10.25 6.5H13.75C14.99 6.5 16 5.49 16 4.25C18.21 4.25 20 5 20 8.25Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M16 4.25C16 5.49 14.99 6.5 13.75 6.5H10.25C9.63 6.5 9.06997 6.25 8.65997 5.84C8.24997 5.43 8 4.87 8 4.25C8 3.01 9.01 2 10.25 2H13.75C14.37 2 14.93 2.25 15.34 2.66C15.75 3.07 16 3.63 16 4.25Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M8 13H12" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M8 17H16" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

        {!notes ? <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
          : <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.56078 20.2501L20.5608 8.25011L15.7501 3.43945L3.75012 15.4395V20.2501H8.56078ZM15.7501 5.56077L18.4395 8.25011L16.5001 10.1895L13.8108 7.50013L15.7501 5.56077ZM12.7501 8.56079L15.4395 11.2501L7.93946 18.7501H5.25012L5.25012 16.0608L12.7501 8.56079Z" fill="#080341" />
          </svg>
        }
      </div>

      <Modal isOpen={show} onClose={() => setShow(false)}>
        <div className="dark-gray">

          <span className="f3 db lh-copy measure flex items-center">
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 8.25V18C20 21 18.21 22 16 22H8C5.79 22 4 21 4 18V8.25C4 5 5.79 4.25 8 4.25C8 4.87 8.24997 5.43 8.65997 5.84C9.06997 6.25 9.63 6.5 10.25 6.5H13.75C14.99 6.5 16 5.49 16 4.25C18.21 4.25 20 5 20 8.25Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M16 4.25C16 5.49 14.99 6.5 13.75 6.5H10.25C9.63 6.5 9.06997 6.25 8.65997 5.84C8.24997 5.43 8 4.87 8 4.25C8 3.01 9.01 2 10.25 2H13.75C14.37 2 14.93 2.25 15.34 2.66C15.75 3.07 16 3.63 16 4.25Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M8 13H12" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M8 17H16" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Notes
          </span>

          <textarea className="w-100 pa4" id="wish-list-notes" name="wish-list-notes" rows="8" onChange={(e) => setNotes(e.target.value)} value={notes} />

          <div className="w-100 flex justify-end">
            <button className={`${styles.notesSubmitButton}`} onClick={() => handleNotesSubmit()} >{currentNotes ? 'Update Notes' : 'Add Notes'}</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Notes