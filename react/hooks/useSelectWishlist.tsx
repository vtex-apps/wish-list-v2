import axios from 'axios'
import { useState, useEffect, useRef, useContext } from 'react'
import useProduct from 'vtex.product-context/useProduct'
import { ToastContext } from 'vtex.styleguide'

import useWishList from './useWishlists'
import useGetWishlist from './useGetWishlists'
import useBundleMinQuantity from './useBundleMinQuantity'
import useMutationUpdateWishlist from './actions/useMutationUpdateWishlist'

const useSelectWishlist = () => {
  const {
    emailInfo,
    nameProduct,
    linkProduct,
    urlImageProduct,
    quantityProduct,
    price,
    idProduct,
    skuCodeReference,
    department,
  } = useWishList()

  const { listWishlist } = useGetWishlist()

  const [textSelect, setTextSelect] = useState('')
  const [valueSelect, setValueSelect] = useState('')
  const [errorSelect, setErrorSelect] = useState('')
  const [selectSize, setSelectSize] = useState(1)
  const selectRef = useRef<HTMLSelectElement | null>(null)

  const [closeSelect, setCloseSelect] = useState(true)
  const [productBundle, setProductBundle] = useState<number>(1)

  const { product, selectedQuantity } = useProduct()
  const { showToast } = useContext<any>(ToastContext)
  const bundle = useBundleMinQuantity(product)
  const { updateWishlist } = useMutationUpdateWishlist(() => {})

  useEffect(() => {
    setProductBundle(bundle)
  }, [bundle])

  const captureValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valueText = e.target.value
    const selectedOptionText = e.target.options[e.target.selectedIndex].text

    setValueSelect(valueText)
    setTextSelect(selectedOptionText)

    if (selectRef.current instanceof HTMLSelectElement) {
      selectRef.current.blur()
    }
  }

  const handleSelectFocus = () => {
    setSelectSize(3)
  }

  const handleSelectBlur = () => {
    setSelectSize(1)
  }

  const addToList = () => {
    if (textSelect.trim() === '') {
      setErrorSelect('Select a list to save your product')

      return
    }

    const existingWishlist = listWishlist.find(
      (typeWish: { wishlistType: string; id: string }) =>
        typeWish.wishlistType === textSelect && typeWish.id === valueSelect
    )

    const newProduct: any = {
      ID: idProduct,
      Image: urlImageProduct,
      unitValue: price,
      linkProduct,
      nameProduct,
      quantityProduct,
      skuCodeReference,
      department,
    }

    if (productBundle !== 1) {
      newProduct.quantityProduct = selectedQuantity * productBundle
      newProduct.bundle = productBundle
    }

    if (existingWishlist) {
      const productExists = existingWishlist.products.some(
        (item: { ID: string | number }) => item.ID === newProduct.ID
      )

      if (!productExists) {
        existingWishlist.products.push(newProduct)

        delete existingWishlist.email
        updateWishlist({
          variables: {
            wishlist: {
              ...existingWishlist,
            },
          },
          refetchQueries: ['getWishlists'],
        })
          .then(() => {
            showToast('Successfully added to the Favourites List')
          })
          .catch((error) => {
            console.error('PUT request failed:', error)
          })
      } else {
        showToast('You have already added this product to the list')
      }
    }

    setCloseSelect(false)
    setErrorSelect('')
  }

  const addProductToFavouriteList = (selectedProduct, selectedWishList) => {
    const existingWishlist = listWishlist.find(
      (typeWish: { email: string; id: string | number }) =>
        typeWish.email === emailInfo && typeWish.id === selectedWishList
    )

    if (selectedProduct.bundle > 1)
      selectedProduct.quantityProduct *= selectedProduct.bundle
    if (existingWishlist) {
      const productExists = existingWishlist.products.some(
        (item: { ID: any }) => item.ID === selectedProduct.ID
      )

      if (!productExists) {
        existingWishlist.products.push(selectedProduct)

        const urlPut =
          '/api/dataentities/whitebird_my_wishlists_wishlist/documents?_schema=0.0.2-mywishlists'

        axios
          .put(urlPut, existingWishlist)
          .then(() => {
            showToast('Successfully added to the Favourites List')
          })
          .catch((error) => {
            console.error('PUT request failed:', error)
          })
      } else {
        showToast('You have already added this product to the list')
      }
    }
  }

  return {
    errorSelect,
    selectSize,
    selectRef,
    valueSelect,
    textSelect,
    closeSelect,
    captureValue,
    handleSelectFocus,
    handleSelectBlur,
    addToList,
    setCloseSelect,
    addProductToFavouriteList,
  }
}

export default useSelectWishlist
