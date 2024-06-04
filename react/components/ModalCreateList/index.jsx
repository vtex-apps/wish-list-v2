import React from 'react'
import PropTypes from 'prop-types'
import { useCssHandles } from 'vtex.css-handles'
import { Input, Button } from 'vtex.styleguide'

import ModalWishList from '../modal'

import './modalCreateList.css'

const CSS_HANDLES = [
  'containerSelectFlexAccount',
  'containerButtonCloseBox',
  'buttonCloseModal',
  'containerButtonClose',
  'containerTitleCreateList',
  'containerInput',
  'containerButtonCreateList2',
  'containerErrorAdd',
]

const ModalCreateList = (props) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <ModalWishList blockClass={props.blockClass}>
      <div className={`${handles.containerSelectFlexAccount}`}>
        <div className={`${handles.containerButtonCloseBox}`}>
          <button
            // eslint-disable-next-line react/jsx-handler-names
            onClick={props.buttonCloseModal}
            className={`${handles.buttonCloseModal}`}
          >
            X
          </button>
        </div>
        <p className={`${handles.containerTitleCreateList}`}>
          Create a name for the list
        </p>
        <Input
          className={`${handles.containerInput}`}
          type="text"
          placeholder="List name"
          name="nameList"
          onChange={props.handleNameList}
        />
        {props.fieldValidation && (
          <p className={`${handles.containerErrorAdd}`}>
            {props.fieldValidation}
          </p>
        )}
        <Button
          onClick={props.handleSubmitData}
          className={`${handles.containerButtonCreateList2}`}
          variation="primary"
          isLoading={props.isButtonLoading}
        >
          Create List
        </Button>
      </div>
    </ModalWishList>
  )
}

ModalCreateList.propTypes = {
  buttonCloseModal: PropTypes.func,
  handleNameList: PropTypes.func,
  fieldValidation: PropTypes.string,
  handleSubmitData: PropTypes.func,
  blockClass: PropTypes.string,
  isButtonLoading: PropTypes.bool,
}

export default ModalCreateList
