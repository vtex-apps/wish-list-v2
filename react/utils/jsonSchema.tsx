/* eslint-disable no-console */
import React from 'react'
import { IconDelete } from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'

import { ProductStepper } from '../components/ProductQuantity'
import styles from '../styles.css'

export const JsonSchema = ({
  addProductsToCart,
  deleteItemsWishlist,
  selectedWishlist,
  wishlist,
  wishlists,
  updateWishlist,
}) => {
  const runtime = useRuntime()
  const { culture } = runtime
  const currency = culture.customCurrencySymbol

  const imageCellRenderer = ({ cellData, rowData }) => {
    const linkUrl = rowData.linkProduct || ''
    const parts = linkUrl.split('.br/')
    const productUrl = `${window.location.origin}/${parts[parts.length - 1]}`

    return (
      <a href={productUrl || ''} target="_blank" rel="noreferrer">
        <img
          src={cellData || rowData.Image || ''}
          alt={rowData.name || ''}
          className={styles.wishlistProductImage}
        />
      </a>
    )
  }

  const departmentCellRenderer = ({ cellData, rowData }) => {
    return (
      <p className={styles.wishlistProductDepartment}>
        {cellData || rowData.department || ''}
      </p>
    )
  }

  const skuReferenceCodeCellRenderer = ({ cellData, rowData }) => {
    const linkUrl = rowData.linkProduct || ''
    const parts = linkUrl.split('.br/')
    const productUrl = `${window.location.origin}/${parts[parts.length - 1]}`

    return (
      <a
        href={productUrl || ''}
        className={styles.wishlistProductTexts}
        target="_blank"
        rel="noreferrer"
      >
        {cellData || rowData.skuCodeReference || ''}
      </a>
    )
  }

  const nameCellRenderer = ({ cellData, rowData }) => {
    const linkUrl = rowData.linkProduct || ''
    const parts = linkUrl.split('.br/')
    const productUrl = `${window.location.origin}/${parts[parts.length - 1]}`

    console.log('cellData : ', cellData)
    console.log('rowData : ', rowData)

    return (
      <a
        href={productUrl || ''}
        className={styles.wishlistProductTexts}
        target="_blank"
        rel="noreferrer"
      >
        {cellData || rowData.nameProduct || ''}
      </a>
    )
  }

  const qtyCellRenderer = ({ rowData }) => {
    console.log('rowData qty : ', rowData)

    return (
      <ProductStepper
        initialQty={rowData.quantity || null}
        wishlist={selectedWishlist !== null ? wishlist : wishlists[0]}
        productName={rowData.name || ''}
        bundle={rowData.bundle || null}
        updateWishlist={updateWishlist}
      />
    )
  }

  const unitValueCellRenderer = ({ cellData }) => {
    const formattedValue = `${currency} ${parseFloat(cellData).toFixed(2)}`

    return (
      <span className={styles.wishlistProductUnitValue}>
        {formattedValue || null}
      </span>
    )
  }

  const addToCartCellRenderer = ({ rowData }) => {
    return (
      <button
        className={styles.wishlistAddItem}
        onClick={() => addProductsToCart(rowData, wishlist || {})}
      >
        Add
      </button>
    )
  }

  const removeCellRenderer = (rowData) => {
    return (
      <button
        className={styles.wishlistDeleteItem}
        onClick={async () => {
          deleteItemsWishlist({
            rowData,
            wishlist,
            selectedWishlist,
            updateWishlist,
          })
        }}
      >
        <IconDelete />
      </button>
    )
  }

  const jsonschema = {
    properties: {
      image: {
        title: 'Image',
        width: 80,
        cellRenderer: imageCellRenderer,
      },
      department: {
        sortable: true,
        title: 'Department',
        width: 150,
        cellRenderer: departmentCellRenderer,
      },
      skuReferenceCode: {
        title: 'Part #',
        width: 125,
        cellRenderer: skuReferenceCodeCellRenderer,
      },
      name: {
        sortable: true,
        title: 'Description',
        width: 220,
        name: '',
        cellRenderer: nameCellRenderer,
      },
      quantity: {
        title: 'Qty',
        width: 145,
        cellRenderer: qtyCellRenderer,
      },
      unitValue: {
        title: 'Unit Value',
        width: 110,
        cellRenderer: unitValueCellRenderer,
      },
      add: {
        title: 'Add',
        width: 100,
        cellRenderer: addToCartCellRenderer,
      },
      remove: {
        title: 'Remove',
        width: 90,
        cellRenderer: removeCellRenderer,
      },
    },
  }

  return jsonschema
}
