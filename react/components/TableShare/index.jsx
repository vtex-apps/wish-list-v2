import React, { useContext, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import {
  Table,
  ToastContext,
  ToastProvider,
  ToastConsumer,
  Button,
} from 'vtex.styleguide'
import { usePixel } from 'vtex.pixel-manager'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { useRuntime } from 'vtex.render-runtime'

import { ProductStepper } from './ProductStepper'
import ModalWishList from '../modal'
import useAddSharedListPage from '../../hooks/useAddSharedListPage'
import ModalCreateList from '../ModalCreateList'
import styles from '../../styles.css'

const CSS_HANDLES = [
  'importList__generalContainer',
  'importList__buttonContainer',
  'importList__modalContainer',
]

export default function TableWishList({ products, queryId }) {
  const { addItems } = useOrderItems()
  const { push } = usePixel()
  const { showToast } = useContext(ToastContext)
  const { handles } = useCssHandles(CSS_HANDLES)
  const [localProducts, setLocalProducts] = useState([...products])
  const [, setIsUpdatingQty] = useState(false)
  const runtime = useRuntime()
  const { culture } = runtime
  const currency = culture.customCurrencySymbol

  const handleQuantityChange = (productId, newQuantity) => {
    // Lógica para actualizar la cantidad de productos en la lista...
    const updatedProducts = localProducts.map((product) => {
      if (product.id === productId) {
        const newTotalValue = newQuantity * product.unitValue

        return { ...product, qty: newQuantity, totalValue: newTotalValue }
      }

      return product
    })

    // Actualiza el estado local
    setLocalProducts(updatedProducts)
  }

  const imageCellRenderer = ({ cellData, rowData }) => (
    <img src={cellData || rowData.Image} alt="" />
  )

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

  const nameCellRenderer = ({ cellData, rowData }) => {
    const linkUrl = rowData.linkProduct
    const parts = linkUrl.split('.br/')
    const productUrl = `/${parts[parts.length - 1]}`
    const productName = cellData || rowData.nameProduct

    return (
      <a href={productUrl} className={styles.wishlistProductTexts}>
        {productName}
      </a>
    )
  }

  const qtyCellRenderer = ({ rowData }) => (
    <ProductStepper
      initialQty={rowData.qty || rowData.quantityProduct}
      productName={rowData.name || rowData.nameProduct}
      bundle={rowData.bundle}
      setIsUpdatingQty={(value) => setIsUpdatingQty(value)}
      rowData={rowData}
      productId={rowData.id}
      handleQuantityChange={handleQuantityChange}
    />
  )

  const unitValueCellRenderer = ({ cellData }) => {
    const formattedValue = `${currency} ${parseFloat(cellData).toFixed(2)}`

    return <span>{formattedValue}</span>
  }

  const totalValueCellRenderer = ({ cellData }) => {
    const formattedValue = `${currency} ${parseFloat(cellData).toFixed(2)}`

    return (
      <span className={styles.wishlistProductUnitValue}>{formattedValue}</span>
    )
  }

  const addCellRenderer = ({ rowData }) => (
    <button
      className={styles.wishlistAddItem}
      onClick={() => addProductsToCart(rowData)}
    >
      Add
    </button>
  )

  const schema = {
    properties: {
      // Definición del esquema de la tabla...
      image: {
        title: 'Image',
        width: 100,
        cellRenderer: imageCellRenderer,
      },
      department: {
        title: 'Department',
        width: 190,
      },
      skuReferenceCode: {
        title: 'Part #',
        width: 130,
        cellRenderer: skuReferenceCodeCellRenderer,
      },
      name: {
        title: 'Description',
        width: 250,
        cellRenderer: nameCellRenderer,
      },
      quantity: {
        title: 'Qty',
        width: 130,
        cellRenderer: qtyCellRenderer,
      },
      unitValue: {
        title: 'Unit Value',
        width: 145,
        cellRenderer: unitValueCellRenderer,
      },
      totalValue: {
        title: 'Total Value',
        width: 120,
        cellRenderer: totalValueCellRenderer,
      },
      add: {
        title: 'Add',
        width: 100,
        cellRenderer: addCellRenderer,
      },
    },
  }

  const addProductsToCart = async (props) => {
    // Lógica para añadir productos al carrito...
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

  // ADD SHARED LIST PAGE
  const {
    isUserLoggedOut,
    navigateToLoginPage,
    isListNameInputVisible,
    handleInputListNameVisualization,
    fieldValidationTable,
    handleNameListTable,
    createNewList,
  } = useAddSharedListPage({ queryId, products })

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
            <div className={handles.importList__modalContainer}>
              <ModalWishList>
                {isListNameInputVisible && (
                  <ModalCreateList
                    handleButtonCloseModal={handleInputListNameVisualization}
                    handleNameList={handleNameListTable}
                    fieldValidation={fieldValidationTable}
                    handleSubmitData={createNewList}
                  />
                )}
              </ModalWishList>
            </div>
          </div>
        </div>
      )}
      <Table
        fullWidth
        schema={schema}
        density="medium"
        items={localProducts}
        emptyStateLabel="Nothing to show"
      />
    </div>
  )
}
