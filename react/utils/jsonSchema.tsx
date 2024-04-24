/* eslint-disable no-console */
import React from 'react'
import { IconDelete } from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'

import { ProductStepper } from '../components/ProductQuantity'
import ProductPriceTotal from '../components/ProductPriceTotal'
import Notes from '../components/Notes'
import UnitPrice from '../components/UnitPrice'
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

  const unitValueCellRenderer = ({ rowData }) => {
    return (
      <UnitPrice skuReference={rowData?.skuReferenceCode} currency={currency} />
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
            row: rowData,
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

  const priceCellRenderer = ({ rowData }) => {
    console.log('rowData : ', rowData)

    return (
      <ProductPriceTotal
        skuReference={rowData?.skuReferenceCode}
        productQuantity={rowData?.quantity}
        currency={currency}
      />
    )
  }

  const notesCellRenderer = ({ rowData }) => {
    return (
      <Notes
        wishlist={selectedWishlist !== null ? wishlist : wishlists[0]}
        updateWishlist={updateWishlist}
        skuReference={rowData?.skuReferenceCode}
        currentNotes={rowData?.notes}
        productName={rowData?.name || ''}
        productImage={rowData?.image || ''}
        partNumber={rowData?.skuReferenceCode || ''}
        price={rowData?.totalValue ? rowData?.totalValue : rowData?.unitValue}
        currency={currency}
      />
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
      totalValue: {
        title: 'Price',
        width: 110,
        cellRenderer: priceCellRenderer,
      },
      notes: {
        title: 'Notes',
        width: 110,
        cellRenderer: notesCellRenderer,
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
