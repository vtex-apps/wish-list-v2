import React, { useEffect, useState } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useRuntime } from 'vtex.render-runtime'

import useCreateListAccount from './useCreateListAccount'
import { useUserEmail } from './useUserEmail'
import useStoreGlobal from '../globalStore/globalStore'
import useMutationCreateWishlist from './actions/useMutationCreateWishlist'
import useQueryWishlists from './actions/useQueryWishlists'

interface UseAddSharedListPageProps {
  queryId: string
  products: any
  updatedProducts: any
}

// interface Product {
//   id: string
//   image: string
//   bundle: string
//   unitValue: string
//   linkProduct: string
//   name: string
//   qty: number
//   skuReferenceCode: string
//   department: string
// }

export default function useAddSharedListPage({
  queryId,
  products,
}: UseAddSharedListPageProps) {
  // ORDER FORM
  const { orderForm } = useOrderForm()

  // RUNTIME
  const { navigate } = useRuntime()

  // PATH VALIDATION
  const pathname = encodeURIComponent(
    `${window.location.pathname}?id=${queryId}`
  )

  const loginUrl = `/login?returnUrl=${pathname}`

  // STATES
  const [isLoading, setIsLoading] = useState(true)
  const [isListNameInputVisible, setIsListNameInputVisible] = useState<boolean>(
    false
  )

  isLoading

  const { updatedProducts } = useStoreGlobal.getState()

  const { createWishlist } = useMutationCreateWishlist(() => {})
  const { data: wishlistsByEmail, refetch } = useQueryWishlists()

  // CREATE WISH LIST
  const {
    fieldValidationTable,
    nameListAccountTable,
    setFieldValidationTable,
    setNameListAccountTable,
    setIsModalAccountTable,
    handleNameListTable,
  } = useCreateListAccount()

  const setWishlists = useStoreGlobal((state) => state.setWishlists)

  // USER EMAIL
  const userEmail = useUserEmail()
  const fetchData = async () => {
    setIsLoading(true)
    refetch()
    const data = wishlistsByEmail

    console.log(`wishlistsByEmail`, wishlistsByEmail)

    setWishlists(data || [])
    setIsLoading(false)
  }

  // EFFECTS
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail])

  // DATA
  const isUserLoggedOut = orderForm.loggedIn === false

  // METHODS
  const navigateToLoginPage = () => {
    navigate({
      to: loginUrl,
    })
  }

  const handleInputListNameVisualization = () => {
    setIsListNameInputVisible((state) => !state)
  }

  const createNewList = async (event: React.FormEvent) => {
    event.preventDefault()

    if (nameListAccountTable.trim() === '') {
      setFieldValidationTable('The field cannot be empty')
    } else {
      const listProducts: any[] = []

      if (Object.keys(updatedProducts).length > 0 && updatedProducts.filter( item => item.ID).length) {

        console.log(`@@@@@@@`)
        Object.values(updatedProducts).forEach((prod: any) => {
          const newProduct: any = {
            ID: prod.ID,
            Image: prod.Image,
            bundle: prod.bundle,
            unitValue: prod.unitValue,
            linkProduct: prod.linkProduct,
            nameProduct: prod.nameProduct,
            quantityProduct: prod.quantityProduct,
            skuCodeReference: prod.skuCodeReference,
            department: prod.department,
          }

          listProducts.push(newProduct)
        })
      } else {
        products.forEach((prod: any) => {
          const newProduct = {
            ID: prod.id || prod.ID,
            Image: prod.image || prod.Image,
            bundle: prod.bundle,
            unitValue: prod.unitValue,
            linkProduct: prod.linkProduct,
            nameProduct: prod.name || prod.nameProduct,
            quantityProduct: prod.qty || prod.quantityProduct,
            skuCodeReference: prod.skuReferenceCode || prod.skuCodeReference,
            department: prod.department,
          }

          listProducts.push(newProduct)
        })
      }

      await createWishlist({
        variables: {
          wishlist: {
            wishlistType: nameListAccountTable,
            isPublic: false,
            products: listProducts,
          },
        },
      })
      setNameListAccountTable('')
      setFieldValidationTable('')
      setNameListAccountTable(false)
      setIsModalAccountTable(false)
      setIsListNameInputVisible(false)
      navigate({ to: '/account#/my-wishlists' })
    }
  }


  console.log(`updatedProducts`, updatedProducts)


  // RETURN
  return {
    isUserLoggedOut,
    navigateToLoginPage,
    isListNameInputVisible,
    handleInputListNameVisualization,
    fieldValidationTable,
    handleNameListTable,
    createNewList,
  }
}
