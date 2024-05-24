import React from 'react'

import { PropsModal } from '../../interfaces/index'
import handles from './modalstyle.css'

const ModalWishList = (props: PropsModal) => {
  return (
    <div
      className={`${props.blockClass} ${handles.modalWishListWrapper} relative`}
    >
      {props.children}
    </div>
  )
}

export default ModalWishList
