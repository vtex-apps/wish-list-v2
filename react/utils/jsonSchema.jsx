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
  const jsonschema = {
    properties: {
      image: {
        title: 'Image',
        width: 80,
        cellRenderer({ cellData, rowData }) {
          const linkUrl = rowData.linkProduct || ''
          const parts = linkUrl.split('.br/')
          const productUrl = `${window.location.origin}/${
            parts[parts.length - 1]
          }`

          return (
            <a href={productUrl || ''} target="_blank" rel="noreferrer">
              <img
                src={cellData || rowData.Image || ''}
                alt={rowData.name || ''}
                className={styles.wishlistProductImage}
              />
            </a>
          )
        },
      },
      department: {
        sortable: true,
        title: 'Department',
        width: 150,
        cellRenderer({ cellData, rowData }) {
          return (
            <p className={styles.wishlistProductDepartment}>
              {cellData || rowData.department || ''}
            </p>
          )
        },
      },
      skuReferenceCode: {
        title: 'Part #',
        width: 125,
        cellRenderer({ cellData, rowData }) {
          const linkUrl = rowData.linkProduct || ''
          const parts = linkUrl.split('.br/')
          const productUrl = `${window.location.origin}/${
            parts[parts.length - 1]
          }`

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
        },
      },
      name: {
        sortable: true,
        title: 'Description',
        width: 220,
        name: '',
        cellRenderer({ cellData, rowData }) {
          const linkUrl = rowData.linkProduct || ''
          const parts = linkUrl.split('.br/')
          const productUrl = `${window.location.origin}/${
            parts[parts.length - 1]
          }`

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
        },
      },
      qty: {
        title: 'Qty',
        width: 145,
        cellRenderer({ rowData }) {
          return (
            <ProductStepper
              initialQty={rowData.qty || null}
              wishlist={selectedWishlist !== null ? wishlist : wishlists[0]}
              productName={rowData.name || ''}
              bundle={rowData.bundle || null}
              updateWishlist={updateWishlist}
            />
          )
        },
      },
      unitValue: {
        title: 'Unit Value',
        width: 110,
        cellRenderer({ cellData }) {
          const formattedValue = `${currency} ${parseFloat(cellData).toFixed(
            2
          )}`

          return (
            <span className={styles.wishlistProductUnitValue}>
              {formattedValue || null}
            </span>
          )
        },
      },
      add: {
        title: 'Add',
        width: 100,
        cellRenderer({ rowData }) {
          return (
            <button
              className={styles.wishlistAddItem}
              onClick={() => addProductsToCart(rowData, wishlist || {})}
            >
              Add
            </button>
          )
        },
      },
      remove: {
        title: 'Remove',
        width: 90,
        cellRenderer(rowData) {
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
        },
      },
    },
  }

  return jsonschema
}
