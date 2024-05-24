import React from 'react'

import { PropsModal } from '../../interfaces/index'
import handles from './modalstyle.css'

const ModalWishList = (props: PropsModal) => {
  return (
    <div className={`${handles.modalWishListWrapper}`}>{props.children}</div>
  )
}

export default ModalWishList
