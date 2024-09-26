import React, { useContext, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import {
  Button,
  Table,
  ToastConsumer,
  ToastContext,
  ToastProvider,
} from 'vtex.styleguide'
import { usePixel } from 'vtex.pixel-manager'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { useRuntime } from 'vtex.render-runtime'
import PropTypes from 'prop-types'

import SkuName from '../SkuName'
import { ProductStepper } from './ProductStepper'
import useAddSharedListPage from '../../hooks/useAddSharedListPage'
import ModalCreateList from '../ModalCreateList'
import styles from '../../styles.css'
import { getProductPath } from '../../utils/jsonSchema'
import ProductPriceTotal from '../ProductPriceTotal'
import UnitPrice from '../UnitPrice'
import { AdminSettings, PublicSettingsForApp } from '../../interfaces'

const CSS_HANDLES = [
  'importList__generalContainer',
  'importList__buttonContainer',
  'importList__modalContainer',
]

interface ITableWishListColumns {
  publicSettingsForApp: PublicSettingsForApp
}
export default function TableWishList({
  products,
  queryId,
  columns,
}: {
  products: any
  queryId: string
  columns: ITableWishListColumns
}) {
  const { addItems } = useOrderItems()
  const { push } = usePixel()
  const { showToast } = useContext(ToastContext)
  const { handles } = useCssHandles(CSS_HANDLES)
  const [localProducts, setLocalProducts] = useState([
    ...products.map((product: any) => ({
      ...product,
      unitValue: product.unitValue ?? 0,
      totalValue: product.quantityProduct * (product.unitValue ?? 0),
    })),
  ])

  const [, setIsUpdatingQty] = useState(false)
  const runtime = useRuntime()
  const { culture } = runtime
  const currency = culture.customCurrencySymbol

  const handleQuantityChange = (productId, newQuantity) => {
    // Lógica para actualizar la cantidad de Products en la lista...
    const updatedProducts = localProducts.map((product) => {
      if (product.ID === productId) {
        const newTotalValue = newQuantity * (product.unitValue ?? 0)

        return {
          ...product,
          unitValue: product.unitValue ?? 0,
          qty: newQuantity,
          totalValue: newTotalValue,
        }
      }

      return product
    })

    // Actualiza el estado local
    setLocalProducts(updatedProducts)
  }

  const priceCellRenderer = ({ rowData }) => {
    return (
      <ProductPriceTotal
        itemId={rowData?.ID}
        productQuantity={rowData?.quantityProduct}
        currency={currency}
      />
    )
  }

  const unitValueCellRenderer = ({ rowData }) => {
    return (
      <UnitPrice
        itemId={rowData?.ID}
        skuReference={rowData?.skuCodeReference}
        currency={currency}
      />
    )
  }

  const imageCellRenderer = ({ cellData, rowData, updateCellMeasurements }) => {
    const productUrl = getProductPath(rowData)

    return (
      <a
        href={productUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.wishlistShareTableCell}
      >
        <img
          src={cellData || rowData.Image}
          alt=""
          className={styles.wishlistProductImage}
          onLoad={() => updateCellMeasurements()}
        />
      </a>
    )
  }

  const skuReferenceCodeCellRenderer = ({ cellData, rowData }) => {
    const linkUrl = rowData.linkProduct
    const parts = linkUrl.split('.br/')
    const productUrl = `/${parts[parts.length - 1]}`

    return (
      <a
        href={productUrl}
        className={styles.wishlistProductTexts}
        target="_blank"
        rel="noopener noreferrer"
      >
        {cellData || rowData.skuCodeReference}
      </a>
    )
  }

  const qtyCellRenderer = ({ rowData }) => (
    <div className={styles.wishlistShareTableCell}>
      <ProductStepper
        initialQty={rowData.qty || rowData.quantityProduct}
        productName={rowData.name || rowData.nameProduct}
        bundle={rowData.bundle}
        setIsUpdatingQty={(value) => setIsUpdatingQty(value)}
        rowData={rowData}
        productId={rowData.ID}
        handleQuantityChange={handleQuantityChange}
      />
    </div>
  )

  const addProductsToCart = async (props) => {
    // Lógica para añadir Products al carrito...
    const productInfo = localProducts.find((item) => props.name === item.name)
    const items = [
      {
        id: productInfo.ID || productInfo.id,
        seller: 1,
        quantity: productInfo.qty,
        name: productInfo.name,
      },
    ]

    addItems(items)
      .then(async () => {
        push({
          event: 'addToCart',
          id: 'addToCart',
        })
        showToast('Item added to the cart')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const addCellRenderer = ({ rowData }) => (
    <div className={styles.wishlistShareTableCell}>
      <button
        className={styles.wishlistAddItem}
        onClick={() => addProductsToCart(rowData)}
      >
        Add
      </button>
    </div>
  )

  // ADD SHARED LIST PAGE
  const {
    isUserLoggedOut,
    navigateToLoginPage,
    isListNameInputVisible,
    handleInputListNameVisualization,
    fieldValidationTable,
    handleNameListTable,
    createNewList,
  } = useAddSharedListPage({ queryId, products, updatedProducts: null })

  const skuNameCellRenderer = ({ rowData }) => {
    const productUrl = getProductPath(rowData)

    return <SkuName itemId={rowData.ID} productUrl={productUrl} />
  }

  const schema: any = {
    properties: {
      // Definición del esquema de la tabla...
      image: {
        title: 'Image',
        // width: 100,
        cellRenderer: imageCellRenderer,
      },
      nameProduct: {
        title: 'Name',
        // width: 300,
        active: true,
        cellRenderer: skuNameCellRenderer,
      },
      department: {
        title: 'Department',
        // width: 190,
      },
      skuReferenceCode: {
        title: 'Part #',
        // width: 130,
        cellRenderer: skuReferenceCodeCellRenderer,
      },
      quantity: {
        title: 'Qty',
        // width: 130,
        cellRenderer: qtyCellRenderer,
      },
      unitValue: {
        title: 'Unit Value',
        // width: 145,
        cellRenderer: unitValueCellRenderer,
      },
      totalValue: {
        title: 'Total Value',
        // width: 120,
        cellRenderer: priceCellRenderer,
      },
      add: {
        title: 'Add',
        // width: 100,
        cellRenderer: addCellRenderer,
      },
    },
  }

  const wishlistColumnsSettings: AdminSettings = JSON.parse(
    columns.publicSettingsForApp.message
  )

  if (wishlistColumnsSettings) {
    schema.properties.image.title = wishlistColumnsSettings.imageName
    schema.properties.image.width = wishlistColumnsSettings.imageRowWidth
    schema.properties.nameProduct.title = wishlistColumnsSettings.skuNameTitle
    schema.properties.nameProduct.width =
      wishlistColumnsSettings.skuNameRowWidthShare
    schema.properties.department.title = wishlistColumnsSettings.departmentTitle
    schema.properties.department.width =
      wishlistColumnsSettings.departmentRowWidth
    schema.properties.skuReferenceCode.title =
      wishlistColumnsSettings.skuReferenceCodeTitle
    schema.properties.skuReferenceCode.width =
      wishlistColumnsSettings.skuReferenceCodeRowWidth
    schema.properties.quantity.title = wishlistColumnsSettings.quantityTitle
    schema.properties.quantity.width = wishlistColumnsSettings.quantityRowWidth
    schema.properties.unitValue.title = wishlistColumnsSettings.unitValueTitle
    schema.properties.unitValue.width =
      wishlistColumnsSettings.unitValueRowWidth
    schema.properties.totalValue.title = wishlistColumnsSettings.totalValueTitle
    schema.properties.totalValue.width =
      wishlistColumnsSettings.totalValueRowWidth
    schema.properties.add.title = wishlistColumnsSettings.addTitle
    schema.properties.add.width = wishlistColumnsSettings.addRowWidth
  }

  for (const [key, value] of Object.entries(wishlistColumnsSettings)) {
    if (!value) {
      delete schema.properties[key]
    }
  }

  return (
    <div className={handles.importList__generalContainer}>
      {/* NEW */}
      {isUserLoggedOut ? (
        <ToastProvider positioning="window">
          <ToastConsumer>
            {() => (
              <div className="flex">
                <div>
                  <Button
                    size="small"
                    variation="secondary"
                    onClick={() =>
                      showToast({
                        message:
                          'You need to be logged in to import this wishlist',
                        action: {
                          label: 'LOG IN',
                          onClick: navigateToLoginPage,
                        },
                      })
                    }
                  >
                    Import Favourite List
                  </Button>
                </div>
              </div>
            )}
          </ToastConsumer>
        </ToastProvider>
      ) : (
        <div className="flex">
          <div className={handles.importList__buttonContainer}>
            <Button
              size="small"
              variation="secondary"
              onClick={handleInputListNameVisualization}
            >
              Import Favourite List
            </Button>
            <div className={`${handles.importList__modalContainer} relative`}>
              {isListNameInputVisible && (
                <ModalCreateList
                  handleButtonCloseModal={handleInputListNameVisualization}
                  handleNameList={handleNameListTable}
                  fieldValidation={fieldValidationTable}
                  handleSubmitData={createNewList}
                  blockClass="vtex-create-wishlist-favorite-list"
                />
              )}
            </div>
          </div>
        </div>
      )}
      <Table
        fullWidth
        dynamicRowHeight
        updateTableKey={`vtex-table=${Math.floor(Math.random() * 1000)}`}
        schema={schema}
        density="medium"
        items={localProducts}
        emptyStateLabel="Nothing to show"
      />
    </div>
  )
}

TableWishList.propTypes = {
  products: PropTypes.any.isRequired,
  queryId: PropTypes.string.isRequired,
  name: PropTypes.string,
}
