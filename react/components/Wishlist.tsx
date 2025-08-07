// Hooks
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { Table, ToastContext } from 'vtex.styleguide'
import { useIntl } from 'react-intl'
// Components
import { useQuery } from 'react-apollo'

import useCreateListAccount from '../hooks/useCreateListAccount'
import AutocompleteBlock from './SearchSKU/AutocompleteBlock'
// Helpers & Utils
import useStoreGlobal from '../globalStore/globalStore'
import useCreateWishlist from '../hooks/actions/useMutationCreateWishlist'
import useDeleteWishlist from '../hooks/actions/useMutationDeleteWishlist'
import useUpdateWishlist from '../hooks/actions/useMutationUpdateWishlist'
import useQueryWishlistById from '../hooks/actions/useQueryWishlistById'
import useAddToCart from '../hooks/useAddToCart'
import useBulkAction from '../hooks/useBulkAction'
import AppSettings from '../queries/AppSettings.graphql'
import { JsonSchema } from '../utils/jsonSchema'
import { deleteItemsWishlist, extractProductData, getEmailID } from './helpers'
// Table config
import { initialJsonState } from '../utils/tableRowsSchema'
import {
  handleFiltersChange,
  handleNextClick,
  handlePrevClick,
  handleSubmitDataTable,
  SelectorObject,
} from './helpers/tableConfig'
import {
  handleInputSearchChange,
  handleInputSearchClear,
  handleInputSearchSubmit,
} from './helpers/tableSearch'
import WishlistDesktop from './WishlistDesktop'
import WishlistMobile from './WishlistMobile'
// Styles
import { ProductsProvider } from '../context/ProductsContext'
import styles from '../styles.css'

interface TablePaginationWrapperProps {
  tableSchema: any
  toolbar: any
  bulkActions: any
  pagination: any
  filters: any
  items: any
}

const TablePaginationWrapper = React.memo<TablePaginationWrapperProps>(
  ({
    tableSchema,
    toolbar,
    bulkActions,
    pagination,
    filters,
    items,
  }: TablePaginationWrapperProps) => {
    return (
      <Table
        fullWidth
        density="medium"
        schema={tableSchema}
        items={items}
        toolbar={toolbar}
        bulkActions={bulkActions}
        pagination={pagination}
        filters={filters}
      />
    )
  },
  (prevProps, nextProps) => {
    return prevProps.items.length === nextProps.items.length
  }
)

TablePaginationWrapper.displayName = 'TablePaginationWrapper'

function Wishlist({ wishlists, fetchData }) {
  const { deviceInfo } = useRuntime()
  const emailIDInfo = getEmailID(wishlists)
  const { selectedWishlist, setSelectedWishlist } = useStoreGlobal()
  const { showToast } = useContext<any>(ToastContext)
  const [filterState, setfilterState] = useState<any>([])
  const intl = useIntl()

  const { data: wishlistColumns } = useQuery(AppSettings, {
    variables: {
      // eslint-disable-next-line no-undef
      version: process.env.VTEX_APP_VERSION,
    },
    ssr: false,
  })

  const handleSelectWishlist = useCallback(
    (id) => {
      setSelectedWishlist(id)
    },
    [setSelectedWishlist]
  )

  const initialProducts =
    wishlists.length > 0
      ? extractProductData({ items: wishlists[0]?.products })
      : []

  const [allProducts, setAllProducts] = useState(initialProducts)
  const [displayedProducts, setDisplayedProducts] = useState(initialProducts)

  const [, setIsLoadingSKU] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [updatedSelectedRows, setUpdatedSelectedRows] = useState([])
  const [wishlist, setWishlist] = useState<any>([])
  const [initialState, setInitialState] = useState(initialJsonState)
  const { refetch } = useQueryWishlistById(selectedWishlist, (data) => {
    if (!data || !data.getWishlist) return

    setWishlist(data.getWishlist)
    const products = extractProductData({
      items: data.getWishlist.products,
    })

    const sortedProducts = products.sort((a, b) =>
      a.department.localeCompare(b.department)
    )

    setAllProducts(sortedProducts)
    setDisplayedProducts(sortedProducts)
  })

  const updateData = () =>
    refetch().then(({ data }) => {
      if (!data || !data.getWishlist) return

      setWishlist(data.getWishlist)

      const products = extractProductData({
        items: data.getWishlist.products,
      })

      const sortedProducts = (products || []).sort((a, b) =>
        a.department.localeCompare(b.department)
      )

      setAllProducts(sortedProducts)
      setDisplayedProducts(sortedProducts)
    })

  const { createWishlist } = useCreateWishlist(async (data) => {
    await fetchData()
    if (data.createWishlist) {
      setSelectedWishlist(data.createWishlist.DocumentId)
    }
  })

  const { updateWishlist } = useUpdateWishlist(async () => {
    await updateData()
  })

  const { deleteWishlist, loading: isDeleting } = useDeleteWishlist(
    selectedWishlist,
    async () => {
      setSelectedWishlist(null)
      await fetchData()
      setSelectedWishlist(
        (wishlists ?? []).length > 0 ? wishlists[0]?.id : null
      )
    }
  )

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(30)
  const [totalItems, setTotalItems] = useState(0)
  const [paginatedData, setPaginatedData] = useState([])
  const addProductsToCart = useAddToCart()
  const handleBulkAction = useBulkAction({
    wishlist,
    selectedWishlist,
    setUpdatedSelectedRows,
    updateWishlist,
  })

  const tableSchema = JsonSchema({
    addProductsToCart,
    deleteItemsWishlist,
    selectedWishlist,
    wishlist,
    wishlists,
    updateWishlist,
    wishlistColumns,
  })

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
  } = useCreateListAccount()

  useEffect(() => {
    const updateStylesForMobile = () => {
      const targetElement = document.querySelector(
        'body > div.render-container.render-route-store-account > div > div.vtex-store__template.bg-base > div > div:nth-child(3) > div > div > div > div > div > div:nth-child(7) > div > div:nth-child(3) > div.whitebird-my-wishlists-0-x-componentContainer.w-two-thirds-l.w-100-ns.fr-l > div > div'
      ) as HTMLDivElement

      if (window.innerWidth <= 768) {
        if (targetElement) {
          targetElement.classList.remove('pa7')
          targetElement.style.setProperty('padding-left', '0rem', 'important')
        }
      } else if (targetElement) {
        targetElement.classList.add('pa7')
      }
    }

    updateStylesForMobile()
    window.addEventListener('resize', updateStylesForMobile)

    return () => {
      window.removeEventListener('resize', updateStylesForMobile)
    }
  }, [])

  useEffect(() => {
    const button = document.querySelector(
      '#toggleFieldsBtn > button'
    ) as HTMLButtonElement

    button.style.minHeight = '28.10px'
    button.style.minWidth = 'min-content'

    button.addEventListener('mouseenter', () => {
      button.style.backgroundColor = '#f2f4f5'
    })

    button.addEventListener('mouseleave', () => {
      button.style.backgroundColor = ''
      button.style.color = ''
    })

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
    editViewText.textContent = intl.formatMessage({ id: 'store/edit-view' })

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

    if (window.innerWidth <= 768) {
      button.style.minHeight = '28px !important'
    }

    if (!button) return

    const handleButtonClick = () => {
      setTimeout(() => {
        const elementToStyle = document.querySelector(
          '#toggleFieldsBtn > div'
        ) as HTMLDivElement

        if (elementToStyle) {
          if (window.innerWidth <= 1046) {
            elementToStyle.style.setProperty('position', 'fixed', 'important')
            elementToStyle.style.setProperty('top', '50%', 'important')
            elementToStyle.style.setProperty('left', '50%', 'important')
            elementToStyle.style.setProperty(
              'transform',
              'translate(-50%, -50%)',
              'important'
            )
            elementToStyle.style.setProperty('z-index', '1000', 'important')
          }
        }
      }, 0)
    }

    button.addEventListener('click', handleButtonClick)

    return () => {
      button.removeEventListener('click', handleButtonClick)
    }
  }, [])

  useEffect(() => {
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

    setPaginatedData(slicedData)
  }, [currentPage, itemsPerPage, displayedProducts])

  // Logic to update the total number of items
  useEffect(() => {
    const data = displayedProducts || []

    setTotalItems(data.length)
  }, [displayedProducts])

  // Handlers to change page and rows per page
  const handleRowsChange = (e, value) => {
    e.preventDefault()
    setItemsPerPage(parseInt(value, 10))
    setCurrentPage(1) // Return to the first page when the number of rows per page changes
  }

  const handleButtonCloseModalTable = (event: {
    preventDefault: () => void
  }) => {
    event.preventDefault()
    buttonCloseModalTable()
  }

  const onAddToWishlist = async (product: any) => {
    setIsLoadingSKU(true)
    const { product: productData } = product.data || {}

    const item =
      productData.items.find(
        (itm: { itemId: string }) => itm.itemId === product?.value
      ) || {}

    const unitMultiplierProperty = productData.properties.find(
      (prop: { name: string }) => prop.name === 'UnitMultiplier'
    )

    const unitMultiplierValue = unitMultiplierProperty
      ? parseInt(unitMultiplierProperty.values[0], 10)
      : 1

    const hasBundle = unitMultiplierValue > 1

    const newProduct = {
      ID: Number(item.itemId),
      Image: item?.images?.[0]?.imageUrl,
      // unitValue: productData.priceRange.sellingPrice.highPrice,
      linkProduct: productData?.link,
      nameProduct: productData?.productName,
      quantityProduct: 1,
      skuCodeReference: item?.referenceId?.[0]?.Value,
      department: productData?.categoryTree?.[0]?.name,
      bundle: hasBundle ? unitMultiplierValue : item.unitMultiplier,
    }

    if (newProduct.bundle > 1) {
      newProduct.quantityProduct *= newProduct.bundle
    }

    try {
      if (
        wishlist.products.some((p: { ID: number }) => p.ID === newProduct.ID)
      ) {
        showToast('You have already added this product to the list')

        return false
      }

      await updateWishlist({
        variables: {
          wishlist: {
            id: selectedWishlist,
            products: [...wishlist.products, newProduct],
          },
        },
      })
      showToast(intl.formatMessage({ id: 'store/successfully-added-to-favorites-list' }))

      return true
    } catch (error) {
      console.error('Error adding to the list:', error)

      return false
    } finally {
      setIsLoadingSKU(false)
    }
  }

  const tableFilterOptions = {
    department: {
      label: intl.formatMessage({ id: 'store/department' }),
      renderFilterLabel: () => {
        if (!filterState.department || !filterState.department.object) {
          return intl.formatMessage({ id: 'store/all' })
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
          trueKeysLabel += `${key}${index === trueKeys.length - 1 ? '' : ', '}`
        })

        return `${isAllTrue ? intl.formatMessage({ id: 'store/all' }) : isAllFalse ? intl.formatMessage({ id: 'store/none' }) : `${trueKeysLabel}`}`
              },
        verbs: [
          {
            label: intl.formatMessage({ id: 'store/sort' }),
            value: 'Sort',
            object: (e: React.ChangeEvent<HTMLSelectElement>) => {
              return SelectorObject(e, filterState?.department?.object)
            },
          },
        ],
      },
      name: {
        label: intl.formatMessage({ id: 'store/description' }),
              renderFilterLabel: () => {
          if (!filterState.name || !filterState.name.object) {
            return intl.formatMessage({ id: 'store/all' })
          }

        const keys = filterState.name.object
          ? Object.keys(filterState.name.object)
          : []

        const isAllTrue = !keys.some((key) => !filterState.name.object[key])

        const isAllFalse = !keys.some((key) => filterState.name.object[key])

        const trueKeys = keys.filter((key) => filterState.name.object[key])

        let trueKeysLabel = ''

        trueKeys.forEach((key, index) => {
          trueKeysLabel += `${key}${index === trueKeys.length - 1 ? '' : ', '}`
        })

        return `${isAllTrue ? intl.formatMessage({ id: 'store/all' }) : isAllFalse ? intl.formatMessage({ id: 'store/none' }) : `${trueKeysLabel}`}`
      },
      verbs: [
        {
          label: intl.formatMessage({ id: 'store/sort' }),
          value: 'Sort',
          object: (e: React.ChangeEvent<HTMLSelectElement>) =>
            SelectorObject(e, filterState?.name?.object),
        },
      ],
    },
  }

  const bulkActionsrowsSelected = (qty: number) => (
    <React.Fragment>{intl.formatMessage({ id: 'store/selected-rows' })}: {qty}</React.Fragment>
  )

  const bulkActionsAllRowsSelected = (qty: number) => (
    <React.Fragment>{intl.formatMessage({ id: 'store/all-rows-selected' })} {qty}</React.Fragment>
  )

  const toolbar = {
    inputSearch: {
      label: intl.formatMessage({ id: 'store/search-this-list' }),
      value: searchValue,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleInputSearchChange({
          e,
          allProducts,
          setSearchValue,
          setDisplayedProducts,
        }),
      onClear: () => handleInputSearchClear(setDisplayedProducts, allProducts),
      onSubmit: (e) =>
        handleInputSearchSubmit({
          e,
          allProducts,
          searchValue,
          setDisplayedProducts,
        }),
    },
    fields: {
      label: intl.formatMessage({ id: 'store/toggle-visible-fields' }),
      showAllLabel: intl.formatMessage({ id: 'store/show-all' }),
      hideAllLabel: intl.formatMessage({ id: 'store/hide-all' }),
    },
  }

  const bulkActions = {
    selectedRows: updatedSelectedRows,
    texts: {
      secondaryActionsLabel: intl.formatMessage({ id: 'store/actions' }),
      rowsSelected: bulkActionsrowsSelected,
      selectAll: intl.formatMessage({ id: 'store/select-all' }),
      allRowsSelected: bulkActionsAllRowsSelected,
    },
    totalItems: '',
    onChange: (params) => {
      setUpdatedSelectedRows(params.selectedRows)
    },
    others: [
      {
        label: intl.formatMessage({ id: 'store/add-to-cart' }),
        handleCallback: (params) => {
          handleBulkAction(params.selectedRows, 'addToCart')
        },
      },
      {
        label: intl.formatMessage({ id: 'store/remove-items' }),
        isDangerous: true,
        handleCallback: (params) =>
          handleBulkAction(params.selectedRows, 'deleteRowsWishlist'),
      },
    ],
  }

  const pagination = {
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
    textShowRows: intl.formatMessage({ id: 'store/show-rows' }),
    textOf: intl.formatMessage({ id: 'store/of' }),
    totalItems,
    rowsOptions: [30, 40, 50, 60],
  }

  const filters = {
    alwaysVisibleFilters: ['department', 'name'],
    statements: initialState.filterStatements,
    onChangeStatements: (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiltersChange({
        statements: initialState.filterStatements,
        initialState,
        setInitialState,
        paginatedData,
        setPaginatedData,
        setDisplayedProducts,
        onChangeStatements: e[2],
        setfilterState,
        filterState,
      })
    },
    clearAllFiltersButtonLabel: intl.formatMessage({ id: 'store/clear-filters' }),
    collapseLeft: true,
    options: tableFilterOptions,
  }

  return (
    <>
      {deviceInfo.type === 'phone' ? (
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
          setFieldValidationTable={setFieldValidationTable}
          nameListAccountTable={nameListAccountTable}
          setNameListAccountTable={setNameListAccountTable}
          setIsModalAccountTable={setIsModalAccountTable}
          deleteWishlist={deleteWishlist}
          buttonCloseModalTable={buttonCloseModalTable}
          handleNameListTable={handleNameListTable}
          fieldValidationTable={fieldValidationTable}
          isDeleting={isDeleting}
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
          setFieldValidationTable={setFieldValidationTable}
          nameListAccountTable={nameListAccountTable}
          setNameListAccountTable={setNameListAccountTable}
          setIsModalAccountTable={setIsModalAccountTable}
          deleteWishlist={deleteWishlist}
          buttonCloseModalTable={handleButtonCloseModalTable}
          handleNameListTable={handleNameListTable}
          fieldValidationTable={fieldValidationTable}
          isDeleting={isDeleting}
        />
      )}

      <AutocompleteBlock
        text={intl.formatMessage({ id: 'store/add-sku' })}
        description={intl.formatMessage({ id: 'store/search-and-add-to-list' })}
        componentOnly={false}
        onAddToWishlist={onAddToWishlist}
      />
      <section className={styles.wishlistSearchContainer}>
        <ProductsProvider items={paginatedData}>
          <TablePaginationWrapper
            tableSchema={tableSchema}
            pagination={pagination}
            bulkActions={bulkActions}
            toolbar={toolbar}
            filters={filters}
            items={paginatedData}
          />
        </ProductsProvider>
      </section>
    </>
  )
}

export default Wishlist
