import React from "react";
import { useCssHandles } from "vtex.css-handles";
import { ToastProvider, ToastConsumer, Button } from "vtex.styleguide";

import SelectWishlist from "../selectWishlists/selectWishlist";
import useWishList from "../../hooks/useWishlists";
import ModalWishList from "../modal";
import useSelectWishlist from "../../hooks/useSelectWishlist";
import useGetWishlist from "../../hooks/useGetWishlists";

const CSS_HANDLES = ["container", "containerLoggedIn"] as const;

const ButtonWishlist = () => {
  const { handles } = useCssHandles(CSS_HANDLES);
  const pathname = encodeURIComponent(window.location.pathname);
  const loginUrl = `/login?returnUrl=${pathname}`;

  const {
    listWishlist,
    sendData1,
    sendData2,
    handleChange,
    addList,
    createLengthZero,
    isShowSelect,
    nameListWishlist,
    setIsShowSelect,
    isShowForm,
    setIsShowForm,
    isButton,
    isMessage,
    isShowForm2,
    clickCreate,
    setIsButton,
    errorName,
    isLoading,
  } = useGetWishlist();

  const { navigate, isLoggedIn, emailInfo } = useWishList();

  const {
    addToList,
    setCloseSelect,
    closeSelect,
    selectRef,
    selectSize,
    captureValue,
    handleSelectFocus,
    handleSelectBlur,
    errorSelect,
  } = useSelectWishlist();

  const close = () => {
    setIsShowSelect(true);
    setCloseSelect(true);
  };

  return (
    <div className={`${handles.container}`}>
      {!isLoggedIn ? (
        <ToastProvider positioning="window">
          <ToastConsumer>
            {({ showToast }) => (
              <div className="flex">
                <div className="mr5">
                  <Button
                    size="small"
                    variation="secondary"
                    onClick={() =>
                      showToast({
                        message:
                          "You need to log in before adding it to the list",
                        action: {
                          label: "LOG IN",
                          onClick: () =>
                            navigate({
                              to: loginUrl,
                            }),
                        },
                      })
                    }
                  >
                    Add to Favourites List
                  </Button>
                </div>
              </div>
            )}
          </ToastConsumer>
        </ToastProvider>
      ) : (
        <div className={`${handles.containerLoggedIn}`}>
          <Button size="small" variation="secondary" onClick={close}>
            Add to Favourites List
          </Button>
          <div className={`${handles.containerLoggedIn}`}>
            <ModalWishList>
              {isShowSelect && (
                <SelectWishlist
                  isButton={isButton}
                  isMessage={isMessage}
                  isShowForm={isShowForm}
                  listTypeWishlist={listWishlist}
                  setIsShowForm={setIsShowForm}
                  nameListWishlist={nameListWishlist}
                  handleChange={handleChange}
                  isShowForm2={isShowForm2}
                  emailInfo={emailInfo}
                  addList={addList}
                  sendData1={sendData1}
                  sendData2={sendData2}
                  clickCreate={clickCreate}
                  closeModal={() => setIsShowSelect(false)}
                  setIsButton={setIsButton}
                  createLengthZero={createLengthZero}
                  selectRef={selectRef}
                  selectSize={selectSize}
                  captureValue={captureValue}
                  handleSelectFocus={handleSelectFocus}
                  handleSelectBlur={handleSelectBlur}
                  errorSelect={errorSelect}
                  addToList={addToList}
                  closeSlect={closeSelect}
                  errorName={errorName}
                  isLoading={isLoading}
                />
              )}
            </ModalWishList>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonWishlist;
