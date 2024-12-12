/* eslint-disable no-console */
import React from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { IconDelete } from 'vtex.styleguide'

import Notes from '../components/Notes'
import ProductPriceTotal from '../components/ProductPriceTotal'
import { ProductStepper } from '../components/ProductQuantity'
import UnitPrice from '../components/UnitPrice'
import styles from '../styles.css'
// import ProductDescription from '../components/ProductDescription'
import SkuName from '../components/SkuName'
import { RowProvider } from '../context/RowContext'
import { AdminSettings } from '../interfaces'
import { removePrefixRegex } from './stringUtils'

interface CellProps {
  title: string
  width?: number
  active?: boolean
  sortable?: boolean
  cellRenderer: (value: any, rowData: any) => JSX.Element // Tipo genérico para a função de renderização
}

interface IJsonSchema {
  properties: {
    image: CellProps
    skuName: CellProps
    department: CellProps
    skuReferenceCode: CellProps
    quantity: CellProps
    unitValue: CellProps
    totalValue: CellProps
    notes: CellProps
    add: CellProps
    remove: CellProps
  }
}

export const getProductPath = (rowData: any) => {
  const isFastStore = (window?.location?.hostname ?? '').startsWith('secure')

  const linkUrl = rowData.linkProduct || ''
  const parts = linkUrl.split('.br/')
  const id = rowData.itemId || rowData.ID

  // eslint-disable-next-line prefer-destructuring
  const productSlug = parts[parts.length - 1]?.split('/')?.[0] ?? ''
  const productPath = isFastStore ? `${productSlug}-${id}` : productSlug

  const hostUrl = removePrefixRegex(window.location.host ?? '', 'secure.')
  const newBaseUrl = `https://${hostUrl}`

  return `${newBaseUrl}/${productPath}/p`
}

const WrapperProductStepper = ({ selectedWishlist, wishlists }) => {
  const currentWishlist =
    selectedWishlist !== null
      ? wishlists.find((wish) => wish.id === selectedWishlist)
      : wishlists[0]

  return <ProductStepper wishlist={currentWishlist} />
}

export const JsonSchema = ({
  addProductsToCart,
  deleteItemsWishlist,
  selectedWishlist,
  wishlist,
  wishlists,
  updateWishlist,
  wishlistColumns,
}) => {
  const runtime = useRuntime()
  const { culture } = runtime
  const currency = culture.customCurrencySymbol

  const currentWishlist =
    selectedWishlist !== null
      ? wishlists.find((wish) => wish.id === selectedWishlist)
      : wishlists[0]

  const imageCellRenderer = ({ cellData, rowData }) => {
    const productUrl = getProductPath(rowData)

    return (
      <a
        href={productUrl || ''}
        target="_blank"
        rel="noreferrer"
        className={styles.wishlistTableCell}
      >
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
    const productUrl = getProductPath(rowData)

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

  // const nameCellRenderer = ({ rowData }) => {
  //   const linkUrl = rowData.linkProduct || ''
  //   const parts = linkUrl.split('.br/')
  //   const productUrl = `${window.location.origin}/${parts[parts.length - 1]}`

  //   return (
  //     <ProductDescription itemId={rowData.itemId} productUrl={productUrl} />
  //   )
  // }

  const qtyCellRenderer = ({ rowData }) => {
    return (
      <RowProvider row={rowData}>
        <div className={styles.wishlistTableCell}>
          <WrapperProductStepper
            selectedWishlist={selectedWishlist}
            wishlists={wishlists}
          />
        </div>
      </RowProvider>
    )
  }

  const unitValueCellRenderer = ({ rowData }) => {
    return (
      <UnitPrice
        itemId={rowData.itemId}
        skuReference={rowData?.skuReferenceCode}
        currency={currency}
      />
    )
  }

  const addToCartCellRenderer = ({ rowData }) => {
    return (
      <button
        className={styles.wishlistAddItem}
        onClick={() => addProductsToCart(rowData, currentWishlist)}
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
    return (
      <ProductPriceTotal
        itemId={rowData.itemId}
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
        currency={currency}
        itemId={rowData?.itemId}
        quantity={rowData?.quantity}
      />
    )
  }

  const skuNameCellRenderer = ({ rowData }) => {
    const productUrl = getProductPath(rowData)

    return <SkuName itemId={rowData.itemId} productUrl={productUrl} />
  }

  const jsonschema: IJsonSchema = {
    properties: {
      image: {
        title: 'Image',
        // width: undefined,
        active: true,
        cellRenderer: imageCellRenderer,
      },
      skuName: {
        title: 'Name',
        // width: undefined,
        active: true,
        cellRenderer: skuNameCellRenderer,
      },
      department: {
        sortable: true,
        title: 'Department',
        // width: undefined,
        active: true,
        cellRenderer: departmentCellRenderer,
      },
      skuReferenceCode: {
        title: 'Part #',
        // width: undefined,
        active: true,
        cellRenderer: skuReferenceCodeCellRenderer,
      },
      // description: {
      //   sortable: true,
      //   title: 'Description',
      //   width: 220,
      //   name: '',
      //   cellRenderer: nameCellRenderer,
      // },
      quantity: {
        title: 'Qty',
        // width: undefined,
        cellRenderer: qtyCellRenderer,
      },
      unitValue: {
        title: 'Unit Value',
        // width: undefined,
        cellRenderer: unitValueCellRenderer,
      },
      totalValue: {
        title: 'Price',
        // width: undefined,
        cellRenderer: priceCellRenderer,
      },
      notes: {
        title: 'Notes',
        // width: undefined,
        cellRenderer: notesCellRenderer,
      },
      add: {
        title: 'Add',
        // width: undefined,
        cellRenderer: addToCartCellRenderer,
      },
      remove: {
        title: 'Remove',
        // width: undefined,
        cellRenderer: removeCellRenderer,
      },
    },
  }

  if (!wishlistColumns?.publicSettingsForApp?.message) return jsonschema
  const wishlistColumnsSettings: AdminSettings = JSON.parse(
    wishlistColumns.publicSettingsForApp.message
  )

  jsonschema.properties.image.title = wishlistColumnsSettings.imageName
  jsonschema.properties.image.width = wishlistColumnsSettings.imageRowWidth
  jsonschema.properties.skuName.title = wishlistColumnsSettings.skuNameTitle
  jsonschema.properties.skuName.width =
    wishlistColumnsSettings.skuNameRowWidthAccount
  jsonschema.properties.department.title =
    wishlistColumnsSettings.departmentTitle
  jsonschema.properties.department.width =
    wishlistColumnsSettings.departmentRowWidth
  jsonschema.properties.skuReferenceCode.title =
    wishlistColumnsSettings.skuReferenceCodeTitle
  jsonschema.properties.skuReferenceCode.width =
    wishlistColumnsSettings.skuReferenceCodeRowWidth
  jsonschema.properties.quantity.title = wishlistColumnsSettings.quantityTitle
  jsonschema.properties.quantity.width =
    wishlistColumnsSettings.quantityRowWidth
  jsonschema.properties.unitValue.title = wishlistColumnsSettings.unitValueTitle
  jsonschema.properties.unitValue.width =
    wishlistColumnsSettings.unitValueRowWidth
  jsonschema.properties.totalValue.title =
    wishlistColumnsSettings.totalValueTitle
  jsonschema.properties.totalValue.width =
    wishlistColumnsSettings.totalValueRowWidth
  jsonschema.properties.add.title = wishlistColumnsSettings.addTitle
  jsonschema.properties.add.width = wishlistColumnsSettings.addRowWidth
  jsonschema.properties.remove.title = wishlistColumnsSettings.removeTitle

  for (const [key, value] of Object.entries(wishlistColumnsSettings)) {
    if (!value) {
      delete jsonschema.properties[key]
    }
  }

  return jsonschema
}
