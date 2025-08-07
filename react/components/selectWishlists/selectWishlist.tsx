import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useIntl } from 'react-intl'

import { SelectWishList } from '../../interfaces'

const CSS_HANDLES = [
  'containerSelect',
  'containerErrorAdd',
  'containerError',
  'containerButtonCloseBox',
  'containerSelectDiv',
  'containerSelectFlex',
  'containerMessageAddCreate',
  'containerShowForm',
  'containerButtonCreateList2',
  'containerSelectTitle',
  'containerButtonClose',
  'containerButtonCreateList',
  'containerInput',
  'containerTitleCreateList',
  'containerSelectDropdown',
  'containerButtonAddList',
  'containerButtonCreate',
] as const

const SelectWishlist = (props: SelectWishList) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const intl = useIntl()

  return (
    <>
      {props.closeSlect && (
        <div className={`${handles.containerSelect}`}>
          <div className={`${handles.containerButtonCloseBox}`}>
            <button
              onClick={props.handleCloseModal}
              className={`${handles.containerButtonClose}`}
            >
              X
            </button>
          </div>
          {props.listTypeWishlist?.length > 0 && (
            <div className={`${handles.containerSelectFlex}`}>
              {!props.clickCreate && (
                <>
                  <select
                    id="selectList"
                    style={{ marginBottom: '15px' }}
                    ref={props.selectRef}
                    className={`${handles.containerSelectDropdown}`}
                    onFocus={props.handleSelectFocus}
                    onBlur={props.handleSelectBlur}
                    onChange={props.handleCaptureValue}
                    size={props.selectSize}
                  >
                    <option value="" disabled selected>
                      {intl.formatMessage({ id: 'store/select-list' })}
                    </option>
                    {props.listTypeWishlist?.map(
                      (newDates: { id: string; wishlistType: string }) => (
                        <option
                          value={newDates.id}
                          key={newDates.id}
                          id={newDates.id}
                        >
                          {newDates.wishlistType}
                        </option>
                      )
                    )}
                  </select>

                  {props.isLoading ? (
                    <>
                      <button
                        disabled={props.isLoading}
                        className={`${handles.containerButtonCreate}`}
                        onClick={props.handleAddList}
                      >
                        {props.isLoading ? intl.formatMessage({ id: 'store/loading' }) : intl.formatMessage({ id: 'store/create-new-list' })}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className={`${handles.containerButtonAddList}`}
                        onClick={props.handleAddToList}
                      >
                        {intl.formatMessage({ id: 'store/add-to-list' })}
                      </button>

                      {props.errorSelect && (
                        <p className={`${handles.containerError}`}>
                          {props.errorSelect}
                        </p>
                      )}
                      <button
                        disabled={props.isLoading}
                        className={`${handles.containerButtonCreate}`}
                        onClick={props.handleAddList}
                      >
                        {props.isLoading ? intl.formatMessage({ id: 'store/loading' }) : intl.formatMessage({ id: 'store/create-new-list' })}
                      </button>
                    </>
                  )}
                </>
              )}

              {props.isShowForm2 && (
                <div className={`${handles.containerShowForm}`}>
                  <p className={`${handles.containerTitleCreateList}`}>
                    {intl.formatMessage({ id: 'store/create-list-name' })}
                  </p>
                  <input
                    type="text"
                    placeholder={intl.formatMessage({ id: 'store/list-name' })}
                    name="nameList"
                    value={props.nameListWishlist}
                    onChange={props.handleChange}
                    className={`${handles.containerInput}`}
                  />
                  {props.errorName && (
                    <p className={`${handles.containerErrorAdd}`}>
                      {props.errorName}
                    </p>
                  )}
                  <button
                    disabled={props.isLoading}
                    onClick={props.handleSendData1}
                    className={`${handles.containerButtonCreateList}`}
                  >
                    {props.isLoading ? intl.formatMessage({ id: 'store/loading' }) : intl.formatMessage({ id: 'store/create-list' })}
                  </button>
                </div>
              )}
            </div>
          )}
          {props.listTypeWishlist?.length === 0 && (
            <div className={`${handles.containerSelectFlex}`}>
              {props.isButton && (
                <button
                  className={`${handles.containerButtonCreate}`}
                  onClick={props.handleCreateLengthZero}
                >
                  {intl.formatMessage({ id: 'store/create-new-list' })}
                </button>
              )}
              {props.isShowForm && (
                <div className={`${handles.containerSelectFlex}`}>
                  <p className={`${handles.containerTitleCreateList}`}>
                    {intl.formatMessage({ id: 'store/create-list-name' })}
                  </p>
                  <input
                    className={`${handles.containerInput}`}
                    type="text"
                    placeholder={intl.formatMessage({ id: 'store/list-name' })}
                    name="nameList"
                    value={props.nameListWishlist}
                    onChange={props.handleChange}
                  />
                  {props.errorName && (
                    <p className={`${handles.containerErrorAdd}`}>
                      {props.errorName}
                    </p>
                  )}
                  <button
                    className={`${handles.containerButtonCreateList2}`}
                    onClick={props.handleSendData2}
                  >
                    {intl.formatMessage({ id: 'store/create-list' })}
                  </button>
                </div>
              )}
              {props.isMessage && (
                <div className={`${handles.containerMessageAddCreate}`}>
                  {intl.formatMessage({ id: 'store/you-created-new-favourite-list' })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default SelectWishlist
