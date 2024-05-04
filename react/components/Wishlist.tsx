/* eslint-disable no-console */
// Hooks
<<<<<<< HEAD:react/components/Wishlist.tsx
import React, { useEffect, useState, useContext, useCallback } from 'react'
import { Table, Spinner, ToastContext } from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'

// Components
import AutocompleteBlock from './SearchSKU/AutocompleteBlock'
import EditableWishlistTitle from './WishlistName/WishlistName'
import WishlistPrivacyOptions from './WishlistPrivacyOptions'
import ModalCreateList from './ModalCreateList'
import useCreateListAccount from '../hooks/useCreateListAccount'
// Helpers & Utils
import { extractProductData, deleteItemsWishlist, getEmailID } from './helpers'
import useQueryWishlistById from '../hooks/actions/useQueryWishlistById'
import useCreateWishlist from '../hooks/actions/useMutationCreateWishlist'
import useUpdateWishlist from '../hooks/actions/useMutationUpdateWishlist'
import useDeleteWishlist from '../hooks/actions/useMutationDeleteWishlist'
import useAddToCart from '../hooks/useAddToCart'
import useBulkAction from '../hooks/useBulkAction'
import { JsonSchema } from '../utils/jsonSchema'
import useStoreGlobal from '../globalStore/globalStore'
=======
import React, { useEffect, useState, useContext } from "react";
import { Table, Spinner, ToastContext } from "vtex.styleguide";
import { useRuntime } from "vtex.render-runtime";

// Components
import AutocompleteBlock from "../components/SearchSKU/AutocompleteBlock";
import EditableWishlistTitle from "./WishlistName/WishlistName";
import WishlistPrivacyOptions from "./WishlistPrivacyOptions";
import ModalCreateList from "./ModalCreateList";
import useCreateListAccount from "../hooks/useCreateListAccount";

// Helpers & Utils
import { extractProductData, deleteItemsWishlist, getEmailID } from "./helpers";
import useQueryWishlistById from "../hooks/actions/useQueryWishlistById";
import useCreateWishlist from "../hooks/actions/useMutationCreateWishlist";
import useUpdateWishlist from "../hooks/actions/useMutationUpdateWishlist";
import useDeleteWishlist from "../hooks/actions/useMutationDeleteWishlist";
import useAddToCart from "../hooks/useAddToCart";
import useBulkAction from "../hooks/useBulkAction";
import { useUserEmail } from "../hooks/useUserEmail";
import { jsonSchema } from "../utils/jsonSchema";
import useStoreGlobal from "../globalStore/globalStore";
>>>>>>> main:react/components/Wishlist.jsx
// Table config
import {
  handleNextClick,
  handlePrevClick,
  handleSubmitDataTable,
  SelectorObject,
  handleFiltersChange,
} from "./helpers/tableConfig";
import {
  handleInputSearchChange,
  handleInputSearchClear,
  handleInputSearchSubmit,
<<<<<<< HEAD:react/components/Wishlist.tsx
} from './helpers/tableSearch'
import { initialJsonState } from '../utils/tableRowsSchema'
=======
} from "./helpers/tableSearch";
import { initialJsonState } from "../utils/tableRowsSchema";
import WishlistDesktop from "./WishlistDesktop";
import WishlistMobile from "./WishlistMobile";

>>>>>>> main:react/components/Wishlist.jsx
// Styles
import styles from "../styles.css";

function Wishlist({ wishlists, fetchData }) {
<<<<<<< HEAD:react/components/Wishlist.tsx
  const { deviceInfo } = useRuntime()
  const emailIDInfo = getEmailID(wishlists)
  const { selectedWishlist, setSelectedWishlist } = useStoreGlobal()
  const { showToast } = useContext<any>(ToastContext)
  const [filterState, setfilterState] = useState<any>([])

  const handleSelectWishlist = useCallback(
    (id) => {
      setSelectedWishlist(id)
    },
    [setSelectedWishlist]
  )

  const [allProducts, setAllProducts] = useState(
    wishlists.length > 0
      ? extractProductData({ items: wishlists[0]?.products })
      : []
  )

  const [displayedProducts, setDisplayedProducts] = useState(
    wishlists.length > 0
      ? extractProductData({ items: wishlists[0]?.products })
      : []
  )

  const [, setIsLoadingSKU] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [updatedSelectedRows, setUpdatedSelectedRows] = useState([])
  const [wishlist, setWishlist] = useState<any>([])
  const [initialState, setInitialState] = useState(initialJsonState)
=======
  const { deviceInfo } = useRuntime();
  const emailIDInfo = getEmailID(wishlists);
  const { selectedWishlist, setSelectedWishlist } = useStoreGlobal();
  const { showToast } = useContext(ToastContext);
  const [filterState, setfilterState] = useState({});

  const handleSelectWishlist = (id) => {
    setSelectedWishlist(id);
  };
  const [allProducts, setAllProducts] = useState(
    wishlists.length > 0 ? extractProductData(wishlists[0]) : []
  );
  const [displayedProducts, setDisplayedProducts] = useState(
    wishlists.length > 0 ? extractProductData(wishlists[0]) : []
  );

  const [isLoadingSKU, setIsLoadingSKU] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isUpdatingQty, setIsUpdatingQty] = useState(false);
  const [updatedSelectedRows, setUpdatedSelectedRows] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [initialState, setInitialState] = useState(initialJsonState);
>>>>>>> main:react/components/Wishlist.jsx
  const { refetch } = useQueryWishlistById(selectedWishlist, (data) => {
    if (!data || !data.getWishlist) return;

    setWishlist(data.getWishlist);
    const products = extractProductData({
<<<<<<< HEAD:react/components/Wishlist.tsx
      items: data.getWishlist.products,
    })
=======
      products: data.getWishlist.products,
    });
>>>>>>> main:react/components/Wishlist.jsx

    const sortedProducts = products.sort((a, b) =>
      a.department.localeCompare(b.department)
    );

    setAllProducts(sortedProducts);
    setDisplayedProducts(sortedProducts);
  });

  const { createWishlist } = useCreateWishlist(async (data) => {
<<<<<<< HEAD:react/components/Wishlist.tsx
    await fetchData()
    if (data.createWishlist) {
      setSelectedWishlist(data.createWishlist.DocumentId)
=======
    await fetchData();
    if (data && data.createWishlist) {
      setSelectedWishlist(data.createWishlist.DocumentId);
>>>>>>> main:react/components/Wishlist.jsx
    }
  });

  const { updateWishlist } = useUpdateWishlist(() => {
    refetch().then(({ data }) => {
      if (!data || !data.getWishlist) return;

<<<<<<< HEAD:react/components/Wishlist.tsx
      setWishlist(data.getWishlist)

      const products = extractProductData({
        items: data.getWishlist.products,
      })
=======
      setWishlist(data.getWishlist);
      const products = extractProductData({
        products: data.getWishlist.products,
      });
>>>>>>> main:react/components/Wishlist.jsx

      const sortedProducts = (products || []).sort((a, b) =>
        a.department.localeCompare(b.department)
      );

      setAllProducts(sortedProducts);
      setDisplayedProducts(sortedProducts);
    });
  });

  const { deleteWishlist, loading: isDeleting } = useDeleteWishlist(
    selectedWishlist,
    async () => {
      await fetchData();
      setSelectedWishlist(wishlists[0].id);
    }
  );

  // Pagination Logic
<<<<<<< HEAD:react/components/Wishlist.tsx
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(30)
  const [totalItems, setTotalItems] = useState(0)
  const [paginatedData, setPaginatedData] = useState([])
  const addProductsToCart = useAddToCart()
  const handleBulkAction = useBulkAction({
=======
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [totalItems, setTotalItems] = useState(0);
  const [paginatedData, setPaginatedData] = useState([]);
  const addProductsToCart = useAddToCart();
  const userEmail = useUserEmail();
  const handleBulkAction = useBulkAction(
>>>>>>> main:react/components/Wishlist.jsx
    wishlist,
    selectedWishlist,
    setUpdatedSelectedRows,
<<<<<<< HEAD:react/components/Wishlist.tsx
    updateWishlist,
  })
=======
    fetchData,
    setSelectedWishlist,
    updateWishlist
  );
>>>>>>> main:react/components/Wishlist.jsx

  const tableSchema = JsonSchema({
    addProductsToCart,
    deleteItemsWishlist,
    selectedWishlist,
    wishlist,
    wishlists,
<<<<<<< HEAD:react/components/Wishlist.tsx
    updateWishlist,
  })
=======
    updateWishlist
  );
>>>>>>> main:react/components/Wishlist.jsx

  const {
    fieldValidationTable,
    isModalAccountTable,
    setFieldValidationTable,
    nameListAccountTable,
    setNameListAccountTable,
    setIsModalAccountTable,
    buttonCloseModalTable,
    buttonModalTable,
    handleNameListTable,
  } = useCreateListAccount();

  useEffect(() => {
    const updateStylesForMobile = () => {
      const targetElement = document.querySelector(
<<<<<<< HEAD:react/components/Wishlist.tsx
        'body > div.render-container.render-route-store-account > div > div.vtex-store__template.bg-base > div > div:nth-child(3) > div > div > div > div > div > div:nth-child(7) > div > div:nth-child(3) > div.whitebird-my-wishlists-0-x-componentContainer.w-two-thirds-l.w-100-ns.fr-l > div > div'
      ) as HTMLDivElement
=======
        "body > div.render-container.render-route-store-account > div > div.vtex-store__template.bg-base > div > div:nth-child(3) > div > div > div > div > div > div:nth-child(7) > div > div:nth-child(3) > div.whitebird-my-wishlists-0-x-componentContainer.w-two-thirds-l.w-100-ns.fr-l > div > div"
      );
>>>>>>> main:react/components/Wishlist.jsx

      if (window.innerWidth <= 768) {
        if (targetElement) {
          targetElement.classList.remove("pa7");
          targetElement.style.setProperty("padding-left", "0rem", "important");
        }
<<<<<<< HEAD:react/components/Wishlist.tsx
      } else if (targetElement) {
        targetElement.classList.add('pa7')
=======
      } else {
        if (targetElement) {
          targetElement.classList.add("pa7");
        }
>>>>>>> main:react/components/Wishlist.jsx
      }
    };

    updateStylesForMobile();
    window.addEventListener("resize", updateStylesForMobile);

    return () => {
      window.removeEventListener("resize", updateStylesForMobile);
    };
  }, []);

  useEffect(() => {
<<<<<<< HEAD:react/components/Wishlist.tsx
    const button = document.querySelector(
      '#toggleFieldsBtn > button'
    ) as HTMLButtonElement

    button.style.minHeight = '28.10px'
    button.style.minWidth = 'min-content'
=======
    const button = document.querySelector("#toggleFieldsBtn > button");
    button.style.minHeight = "28.10px";
    button.style.minWidth = "min-content";
>>>>>>> main:react/components/Wishlist.jsx

    button.addEventListener("mouseenter", () => {
      button.style.backgroundColor = "#f2f4f5";
    });

    button.addEventListener("mouseleave", () => {
      button.style.backgroundColor = "";
      button.style.color = "";
    });

<<<<<<< HEAD:react/components/Wishlist.tsx
    const svgContainer = button.querySelector('.vtex-button__label')

    if (!svgContainer) {
      return
    }

    const svg = svgContainer.querySelector('svg')

    if (svg) {
      svg.style.display = 'none'
    }

    let editViewText = svgContainer.querySelector(
      '.edit-view-text'
    ) as HTMLSpanElement

    if (editViewText) {
      return
    }

    editViewText = document.createElement('span')
    editViewText.classList.add('edit-view-text')
    editViewText.textContent = 'Edit View'

    if (window.innerWidth <= 768) {
      button.style.minHeight = '28.09px !important'
      editViewText.textContent = 'Edit'
      editViewText.style.cssText += 'font-weight: 500; font-size: 13px'
      editViewText.style.cssText += 'top: initial'
    }

    svgContainer.appendChild(editViewText)
  }, [])

  useEffect(() => {
    const button = document.querySelector(
      '#toggleFieldsBtn'
    ) as HTMLButtonElement
=======
    if (!button) return;

    const svgContainer = button.querySelector(".vtex-button__label");
    if (svgContainer) {
      const svg = svgContainer.querySelector("svg");
      if (svg) {
        svg.style.display = "none";
      }

      let editViewText = svgContainer.querySelector(".edit-view-text");
      if (!editViewText) {
        editViewText = document.createElement("span");
        editViewText.classList.add("edit-view-text");
        editViewText.textContent = "Edit View";

        if (window.innerWidth <= 768) {
          button.style.minHeight = "28.09px !important";
          editViewText.textContent = "Edit";
          editViewText.style.cssText += "font-weight: 500; font-size: 13px";
          editViewText.style.cssText += "top: initial";
        }

        svgContainer.appendChild(editViewText);
      }
    }
  }, []);

  useEffect(() => {
    const button = document.querySelector("#toggleFieldsBtn");
>>>>>>> main:react/components/Wishlist.jsx

    if (window.innerWidth <= 768) {
      button.style.minHeight = "28px !important";
    }

    if (!button) return;

    const handleButtonClick = () => {
      setTimeout(() => {
<<<<<<< HEAD:react/components/Wishlist.tsx
        const elementToStyle = document.querySelector(
          '#toggleFieldsBtn > div'
        ) as HTMLDivElement

=======
        const elementToStyle = document.querySelector("#toggleFieldsBtn > div");
>>>>>>> main:react/components/Wishlist.jsx
        if (elementToStyle) {
          if (window.innerWidth <= 1046) {
            elementToStyle.style.setProperty("position", "fixed", "important");
            elementToStyle.style.setProperty("top", "50%", "important");
            elementToStyle.style.setProperty("left", "50%", "important");
            elementToStyle.style.setProperty(
              "transform",
              "translate(-50%, -50%)",
              "important"
            );
            elementToStyle.style.setProperty("z-index", "1000", "important");
          }
        }
      }, 0);
    };

    button.addEventListener("click", handleButtonClick);

    return () => {
      button.removeEventListener("click", handleButtonClick);
    };
  }, []);

  useEffect(() => {
<<<<<<< HEAD:react/components/Wishlist.tsx
    setSelectedWishlist(selectedWishlist)
    handleSelectWishlist(selectedWishlist)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWishlist])

  // Logic to get paginated data
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const data = displayedProducts || []
    const slicedData = data.slice(startIndex, endIndex)

    console.log('displayedProducts : ', displayedProducts)
    console.log('slicedData : ', slicedData)

    setPaginatedData(slicedData)
  }, [currentPage, itemsPerPage, displayedProducts])

  // Logic to update the total number of items
  useEffect(() => {
    const data = displayedProducts || []

    setTotalItems(data.length)
  }, [displayedProducts])

  // Handlers to change page and rows per page
  const handleRowsChange = (value) => {
    setItemsPerPage(parseInt(value, 10))
    setCurrentPage(1) // Return to the first page when the number of rows per page changes
  }
=======
    setSelectedWishlist(selectedWishlist);
    handleSelectWishlist(selectedWishlist);
  }, [selectedWishlist]);

  // Logic to get paginated data
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const data = displayedProducts || [];
    const slicedData = data.slice(startIndex, endIndex);
    setPaginatedData(slicedData);
  }, [currentPage, itemsPerPage, displayedProducts]);

  // Logic to update the total number of items
  useEffect(() => {
    const data = displayedProducts || [];
    setTotalItems(data.length);
  }, [displayedProducts]);

  // Handlers to change page and rows per page
  const handleRowsChange = (e, value) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1); // Return to the first page when the number of rows per page changes
  };
>>>>>>> main:react/components/Wishlist.jsx

  const bulkActionsrowsSelected = (qty: number) => (
    <React.Fragment>Selected rows: {qty}</React.Fragment>
  )

  const bulkActionsAllRowsSelected = (qty: number) => (
    <React.Fragment>All rows selected {qty}</React.Fragment>
  )

  return (
    <>
      {isDeleting ? (
        <Spinner />
      ) : (
        <>
<<<<<<< HEAD:react/components/Wishlist.tsx
          {deviceInfo.type === 'phone' ? (
            <div id="wish-list-mobile">
              {/* Mobile Design */}

              <div className={styles.wishlistOptionsContainer}>
                <div className={styles.wishlistSelector}>
                  <p className={styles.wishlistSelectListOneText}>
                    Favourites List
                  </p>
                  <div className={`${styles.createListandAndSelectFav}`}>
                    <select
                      className={styles.wishlistSelectListOne}
                      id="selectListTable"
                      onChange={(e) => {
                        handleSelectWishlist(e.target.value)
                      }}
                      size={1}
                      value={selectedWishlist}
                    >
                      <option value="" disabled selected>
                        Select an option
                      </option>
                      {emailIDInfo.map((newDates) => (
                        <option
                          className={styles.wishlistSelectListOneOption}
                          value={newDates.value}
                          key={newDates.value}
                          id={newDates.value}
                        >
                          {newDates.label}
                        </option>
                      ))}
                    </select>
                    <section>
                      <button
                        className={`${styles.wishlistCreateNew} ${styles.wishlistCreateNewHelper}`}
                        onClick={buttonModalTable}
                      >
                        New
                      </button>
                      {isModalAccountTable && (
                        <ModalCreateList
                          buttonCloseModal={buttonCloseModalTable}
                          handleNameList={handleNameListTable}
                          fieldValidation={fieldValidationTable}
                          handleSubmitData={(event: React.FormEvent) =>
                            handleSubmitDataTable({
                              event,
                              createWishlist,
                              setFieldValidationTable,
                              nameListAccountTable,
                              setNameListAccountTable,
                              setIsModalAccountTable,
                            })
                          }
                        />
                      )}
                    </section>
                  </div>
                </div>
              </div>

              <div className={`${styles.nameAndOptionsMobile}`}>
                <EditableWishlistTitle
                  initialTitle={
                    selectedWishlist !== null ? wishlist.wishlistType : ''
                  }
                  wishlistId={
                    selectedWishlist !== null
                      ? selectedWishlist
                      : wishlists[0].id
                  }
                  wishlist={selectedWishlist !== null ? wishlist : wishlists[0]}
                  fetchData={fetchData}
                />
                <div className={`${styles.optionsMobile}`}>
                  <WishlistPrivacyOptions
                    selectedWishlist={
                      selectedWishlist !== null
                        ? selectedWishlist
                        : wishlists[0].id
                    }
                    wishlists={wishlists}
                    buttonLabel="Share"
                  />
                  <button
                    className={styles.wishlistDeleteWishList}
                    onClick={() => deleteWishlist()}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div id="wish-list-desktop">
              <EditableWishlistTitle
                initialTitle={
                  selectedWishlist !== null ? wishlist.wishlistType : ''
                }
                wishlistId={
                  selectedWishlist !== null ? selectedWishlist : wishlists[0].id
                }
                wishlist={selectedWishlist !== null ? wishlist : wishlists[0]}
                fetchData={fetchData}
              />
              <div className={styles.wishlistOptionsContainer}>
                <div className={styles.wishlistSelector}>
                  <p className={styles.wishlistSelectListOneText}>
                    Favourites List
                  </p>
                  <select
                    className={styles.wishlistSelectListOne}
                    id="selectListTable"
                    onChange={(e) => {
                      handleSelectWishlist(e.target.value)
                    }}
                    size={1}
                    value={selectedWishlist}
                  >
                    <option value="" disabled selected>
                      Select an option
                    </option>
                    {emailIDInfo.map((newDates) => (
                      <option
                        className={styles.wishlistSelectListOneOption}
                        value={newDates.value}
                        key={newDates.value}
                        id={newDates.value}
                      >
                        {newDates.label}
                      </option>
                    ))}
                  </select>
                </div>
                <section className={styles.wishlistCreationOptions}>
                  <button
                    className={`${styles.wishlistCreateNew} ${styles.wishlistCreateNewHelper}`}
                    onClick={buttonModalTable}
                  >
                    Create New List
                  </button>
                  {isModalAccountTable && (
                    <ModalCreateList
                      buttonCloseModal={buttonCloseModalTable}
                      handleNameList={handleNameListTable}
                      fieldValidation={fieldValidationTable}
                      handleSubmitData={(event) =>
                        handleSubmitDataTable({
                          event,
                          createWishlist,
                          setFieldValidationTable,
                          nameListAccountTable,
                          setNameListAccountTable,
                          setIsModalAccountTable,
                        })
                      }
                    />
                  )}
                  <WishlistPrivacyOptions
                    selectedWishlist={
                      selectedWishlist !== null
                        ? selectedWishlist
                        : wishlists[0].id
                    }
                    wishlists={wishlists}
                    buttonLabel="Share This List"
                  />
                  <button
                    className={styles.wishlistDeleteWishList}
                    onClick={() => deleteWishlist()}
                  >
                    Delete Selected List
                  </button>
                </section>
              </div>
            </div>
=======
          {deviceInfo.type === "phone" ? (
            <WishlistMobile
              selectedWishlist={selectedWishlist}
              wishlists={wishlists}
              wishlist={wishlist}
              fetchData={fetchData}
              handleSelectWishlist={handleSelectWishlist}
              emailIDInfo={emailIDInfo}
              buttonModalTable={buttonModalTable}
              isModalAccountTable={isModalAccountTable}
              handleSubmitDataTable={handleSubmitDataTable}
              createWishlist={createWishlist}
              userEmail={userEmail}
              setFieldValidationTable={setFieldValidationTable}
              nameListAccountTable={nameListAccountTable}
              setNameListAccountTable={setNameListAccountTable}
              setIsModalAccountTable={setIsModalAccountTable}
              deleteWishlist={deleteWishlist}
              buttonCloseModalTable={buttonCloseModalTable}
              handleNameListTable={handleNameListTable}
              fieldValidationTable={fieldValidationTable}
            />
          ) : (
            <WishlistDesktop
              selectedWishlist={selectedWishlist}
              wishlists={wishlists}
              wishlist={wishlist}
              fetchData={fetchData}
              handleSelectWishlist={handleSelectWishlist}
              emailIDInfo={emailIDInfo}
              buttonModalTable={buttonModalTable}
              isModalAccountTable={isModalAccountTable}
              handleSubmitDataTable={handleSubmitDataTable}
              createWishlist={createWishlist}
              userEmail={userEmail}
              setFieldValidationTable={setFieldValidationTable}
              nameListAccountTable={nameListAccountTable}
              setNameListAccountTable={setNameListAccountTable}
              setIsModalAccountTable={setIsModalAccountTable}
              deleteWishlist={deleteWishlist}
              buttonCloseModalTable={buttonCloseModalTable}
              handleNameListTable={handleNameListTable}
              fieldValidationTable={fieldValidationTable}
            />
>>>>>>> main:react/components/Wishlist.jsx
          )}

          <AutocompleteBlock
            text="Add SKU"
            description="Search and add to your list"
            componentOnly={false}
<<<<<<< HEAD:react/components/Wishlist.tsx
            onAddToWishlist={async (product: any) => {
              setIsLoadingSKU(true)
              const { product: productData } = product.data || {}
              const item = productData.items[0] || {}

              const unitMultiplierProperty = productData.properties.find(
                (prop: { name: string }) => prop.name === 'UnitMultiplier'
              )

              const unitMultiplierValue = unitMultiplierProperty
                ? parseInt(unitMultiplierProperty.values[0], 10)
                : 1

              const hasBundle = unitMultiplierValue > 1
=======
            onAddToWishlist={async (product) => {
              setIsLoadingSKU(true);
              const { product: productData } = product?.data || {};
              const item = productData?.items?.[0] || {};

              const unitMultiplierProperty = productData?.properties?.find(
                (prop) => prop.name === "UnitMultiplier"
              );
              const unitMultiplierValue = unitMultiplierProperty
                ? parseInt(unitMultiplierProperty.values[0], 10)
                : 1;
              const hasBundle = unitMultiplierValue > 1;
>>>>>>> main:react/components/Wishlist.jsx

              const newProduct = {
                ID: Number(item.itemId),
                Image: item.images[0].imageUrl,
                unitValue: productData.priceRange.sellingPrice.highPrice,
                linkProduct: productData.link,
                nameProduct: productData.productName,
                quantityProduct: 1,
<<<<<<< HEAD:react/components/Wishlist.tsx
                skuCodeReference: item.referenceId[0].Value,
                department: productData.categoryTree[0].name,
                bundle: hasBundle ? unitMultiplierValue : item.unitMultiplier,
              }
=======
                skuCodeReference: item?.referenceId?.[0]?.Value,
                department: productData?.categoryTree?.[0]?.name,
                bundle: hasBundle ? unitMultiplierValue : item?.unitMultiplier,
              };
>>>>>>> main:react/components/Wishlist.jsx

              if (newProduct.bundle > 1) {
                newProduct.quantityProduct *= newProduct.bundle;
              }

              try {
<<<<<<< HEAD:react/components/Wishlist.tsx
                if (
                  wishlist.products.some(
                    (p: { ID: number }) => p.ID === newProduct.ID
                  )
                ) {
                  showToast('You have already added this product to the list')

                  return false
=======
                if (wishlist.products.some((p) => p.ID === newProduct.ID)) {
                  showToast("You have already added this product to the list");
                  return false;
>>>>>>> main:react/components/Wishlist.jsx
                }

                await updateWishlist({
                  variables: {
                    wishlist: {
                      id: selectedWishlist,
                      products: [...wishlist.products, newProduct],
                    },
                  },
<<<<<<< HEAD:react/components/Wishlist.tsx
                })
                showToast('Successfully added to the Favourites List')

                return true
              } catch (error) {
                console.error('Error adding to the list:', error)

                return false
=======
                });
                showToast("Successfully added to the Favourites List");
                return true;
              } catch (error) {
                console.error("Error adding to the list:", error);
>>>>>>> main:react/components/Wishlist.jsx
              } finally {
                setIsLoadingSKU(false);
              }
            }}
          />
          <section className={styles.wishlistSearchContainer}>
            <Table
              density="medium"
              schema={tableSchema}
              items={paginatedData || []}
              toolbar={{
                inputSearch: {
                  label: "Search This List",
                  value: searchValue,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputSearchChange({
                      e,
                      allProducts,
                      setSearchValue,
                      setDisplayedProducts,
                    }),
                  onClear: () =>
                    handleInputSearchClear(setDisplayedProducts, allProducts),
                  onSubmit: (e) =>
                    handleInputSearchSubmit({
                      e,
                      allProducts,
                      searchValue,
                      setDisplayedProducts,
                    }),
                },
                fields: {
                  label: "Toggle visible fields",
                  showAllLabel: "Show All",
                  hideAllLabel: "Hide All",
                },
              }}
              bulkActions={{
                selectedRows: updatedSelectedRows,
                texts: {
<<<<<<< HEAD:react/components/Wishlist.tsx
                  secondaryActionsLabel: 'Actions',
                  rowsSelected: bulkActionsrowsSelected,
                  selectAll: 'Select all',
                  allRowsSelected: bulkActionsAllRowsSelected,
=======
                  secondaryActionsLabel: "Actions",
                  rowsSelected: (qty) => (
                    <React.Fragment>Selected rows: {qty}</React.Fragment>
                  ),
                  selectAll: "Select all",
                  allRowsSelected: (qty) => (
                    <React.Fragment>All rows selected {qty}</React.Fragment>
                  ),
>>>>>>> main:react/components/Wishlist.jsx
                },
                totalItems: "",
                onChange: (params) => {
                  setUpdatedSelectedRows(params.selectedRows);
                },
                others: [
                  {
<<<<<<< HEAD:react/components/Wishlist.tsx
                    label: 'Add to cart',
                    handleCallback: (params) => {
                      handleBulkAction(params.selectedRows, 'addToCart')
                    },
=======
                    label: "Add to cart",
                    handleCallback: (params) =>
                      handleBulkAction(params.selectedRows, "addToCart"),
>>>>>>> main:react/components/Wishlist.jsx
                  },
                  {
                    label: "Remove item(s)",
                    isDangerous: true,
                    handleCallback: (params) =>
                      handleBulkAction(
                        params.selectedRows,
                        "deleteRowsWishlist"
                      ),
                  },
                ],
              }}
              pagination={{
                onNextClick: () =>
                  handleNextClick({
                    currentPage,
                    setCurrentPage,
                    totalItems,
                    itemsPerPage,
                  }),
                onPrevClick: () => handlePrevClick(currentPage, setCurrentPage),
                currentItemFrom: (currentPage - 1) * itemsPerPage + 1,
                currentItemTo: Math.min(currentPage * itemsPerPage, totalItems),
                onRowsChange: handleRowsChange,
                textShowRows: "Show rows",
                textOf: "of",
                totalItems,
                rowsOptions: [30, 40, 50, 60],
              }}
              filters={{
                alwaysVisibleFilters: ["department", "name"],
                statements: initialState.filterStatements,
<<<<<<< HEAD:react/components/Wishlist.tsx
                onChangeStatements: (
                  e: React.ChangeEvent<HTMLInputElement>
                ) => {
                  handleFiltersChange({
                    statements: initialState.filterStatements,
=======
                onChangeStatements: (e) => {
                  handleFiltersChange(
                    initialState.filterStatements,
>>>>>>> main:react/components/Wishlist.jsx
                    initialState,
                    setInitialState,
                    paginatedData,
                    setPaginatedData,
                    setDisplayedProducts,
                    onChangeStatements: e[2],
                    setfilterState,
<<<<<<< HEAD:react/components/Wishlist.tsx
                    filterState,
                  })
=======
                    filterState
                  );
>>>>>>> main:react/components/Wishlist.jsx
                },
                clearAllFiltersButtonLabel: "Clear Filters",
                collapseLeft: true,
                options: {
                  department: {
<<<<<<< HEAD:react/components/Wishlist.tsx
                    label: 'Department',
                    renderFilterLabel: () => {
=======
                    label: "Department",
                    renderFilterLabel: (st) => {
>>>>>>> main:react/components/Wishlist.jsx
                      if (
                        !filterState.department ||
                        !filterState.department.object
                      ) {
<<<<<<< HEAD:react/components/Wishlist.tsx
                        return 'All'
                      }

                      const keys = filterState.department.object
                        ? Object.keys(filterState.department.object)
                        : []

                      const isAllTrue = !keys.some(
                        (key) => !filterState.department.object[key]
                      )

                      const isAllFalse = !keys.some(
                        (key) => filterState.department.object[key]
                      )

                      const trueKeys = keys.filter(
                        (key) => filterState.department.object[key]
                      )

                      let trueKeysLabel = ''

                      trueKeys.forEach((key, index) => {
                        trueKeysLabel += `${key}${
                          index === trueKeys.length - 1 ? '' : ', '
                        }`
                      })

                      return `${
                        isAllTrue
                          ? 'All'
                          : isAllFalse
                          ? 'None'
                          : `${trueKeysLabel}`
                      }`
                    },
                    verbs: [
                      {
                        label: 'Sort',
                        value: 'Sort',
                        object: (e: React.ChangeEvent<HTMLSelectElement>) => {
                          return SelectorObject(
                            e,
                            filterState?.department?.object
                          )
                        },
=======
                        return "All";
                      }
                      const keys = filterState.department.object
                        ? Object.keys(filterState.department.object)
                        : {};
                      const isAllTrue = !keys.some(
                        (key) => !filterState.department.object[key]
                      );
                      const isAllFalse = !keys.some(
                        (key) => filterState.department.object[key]
                      );
                      const trueKeys = keys.filter(
                        (key) => filterState.department.object[key]
                      );
                      let trueKeysLabel = "";
                      trueKeys.forEach((key, index) => {
                        trueKeysLabel += `${key}${
                          index === trueKeys.length - 1 ? "" : ", "
                        }`;
                      });
                      return `${
                        isAllTrue
                          ? "All"
                          : isAllFalse
                          ? "None"
                          : `${trueKeysLabel}`
                      }`;
                    },
                    verbs: [
                      {
                        label: "Sort",
                        value: "Sort",
                        object: (e) =>
                          selectorObject(e, filterState?.department?.object),
>>>>>>> main:react/components/Wishlist.jsx
                      },
                    ],
                  },
                  name: {
<<<<<<< HEAD:react/components/Wishlist.tsx
                    label: 'Description',
                    renderFilterLabel: () => {
=======
                    label: "Description",
                    renderFilterLabel: (st) => {
>>>>>>> main:react/components/Wishlist.jsx
                      if (!filterState.name || !filterState.name.object) {
                        return "All";
                      }
<<<<<<< HEAD:react/components/Wishlist.tsx

                      const keys = filterState.name.object
                        ? Object.keys(filterState.name.object)
                        : []

                      const isAllTrue = !keys.some(
                        (key) => !filterState.name.object[key]
                      )

                      const isAllFalse = !keys.some(
                        (key) => filterState.name.object[key]
                      )

                      const trueKeys = keys.filter(
                        (key) => filterState.name.object[key]
                      )

                      let trueKeysLabel = ''

                      trueKeys.forEach((key, index) => {
                        trueKeysLabel += `${key}${
                          index === trueKeys.length - 1 ? '' : ', '
                        }`
                      })

                      return `${
                        isAllTrue
                          ? 'All'
                          : isAllFalse
                          ? 'None'
                          : `${trueKeysLabel}`
                      }`
                    },
                    verbs: [
                      {
                        label: 'Sort',
                        value: 'Sort',
                        object: (e: React.ChangeEvent<HTMLSelectElement>) =>
                          SelectorObject(e, filterState?.name?.object),
=======
                      const keys = filterState.name.object
                        ? Object.keys(filterState.name.object)
                        : {};
                      const isAllTrue = !keys.some(
                        (key) => !filterState.name.object[key]
                      );
                      const isAllFalse = !keys.some(
                        (key) => filterState.name.object[key]
                      );
                      const trueKeys = keys.filter(
                        (key) => filterState.name.object[key]
                      );
                      let trueKeysLabel = "";
                      trueKeys.forEach((key, index) => {
                        trueKeysLabel += `${key}${
                          index === trueKeys.length - 1 ? "" : ", "
                        }`;
                      });
                      return `${
                        isAllTrue
                          ? "All"
                          : isAllFalse
                          ? "None"
                          : `${trueKeysLabel}`
                      }`;
                    },
                    verbs: [
                      {
                        label: "Sort",
                        value: "Sort",
                        object: (e) =>
                          selectorObject(e, filterState?.name?.object),
>>>>>>> main:react/components/Wishlist.jsx
                      },
                    ],
                  },
                },
              }}
            />
          </section>
        </>
      )}
    </>
  );
}

export default Wishlist;
