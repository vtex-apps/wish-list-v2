import React from "react";
import PropTypes from "prop-types";
import { useCssHandles } from "vtex.css-handles";

import ModalWishList from "../modal";

const CSS_HANDLES = [
  "containerSelectFlexAccount",
  "containerButtonCloseBox",
  "containerButtonClose",
  "containerTitleCreateList",
  "containerInput",
  "containerButtonCreateList2",
  "containerErrorAdd",
];

const ModalCreateList = (props) => {
  const { handles } = useCssHandles(CSS_HANDLES);

  return (
    <ModalWishList>
      <div className={`${handles.containerSelectFlexAccount}`}>
        <div className={`${handles.containerButtonCloseBox}`}>
          <button
            onClick={props.handleButtonCloseModal}
            className={`${handles.containerButtonClose}`}
          >
            X
          </button>
        </div>
        <p className={`${handles.containerTitleCreateList}`}>
          Create a name for the list
        </p>
        <input
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
        <button
          onClick={props.handleSubmitData}
          className={`${handles.containerButtonCreateList2}`}
        >
          Create List
        </button>
      </div>
    </ModalWishList>
  );
};

ModalCreateList.propTypes = {
  handleButtonCloseModal: PropTypes.func,
  handleNameList: PropTypes.func,
  fieldValidation: PropTypes.string,
  handleSubmitData: PropTypes.func,
};

export default ModalCreateList;
