import React, { useCallback, useEffect, useState } from 'react'

type ProductsContextType = {
  items: any[]
  setItems: React.Dispatch<React.SetStateAction<any[]>>
  updateItem: (item: any) => void
  getItem: (id: string) => any
  updateQuantityBySkuReferenceCode: (
    skuReferenceCode: string,
    quantity: number
  ) => void
}

const ProductsContext = React.createContext<ProductsContextType | undefined>(
  undefined
)

const ProductsProvider = ({
  children,
  items,
}: {
  children: React.ReactNode
  items: any[]
}) => {
  const [localItems, setLocalItems] = useState<any[]>([])

  const updateItem = useCallback(
    (item: any) => {
      const index = localItems.findIndex((i) => i.id === item.id)
      const newItems = [...localItems]

      newItems[index] = item
      setLocalItems(newItems)
    },
    [localItems, setLocalItems]
  )

  const getItem = useCallback(
    (id: string) => {
      return localItems.find((item) => item.itemId === id)
    },
    [localItems]
  )

  const updateQuantityBySkuReferenceCode = useCallback(
    (skuReferenceCode: string, quantity: number) => {
      const item = localItems.find(
        (local) => local.skuReferenceCode === skuReferenceCode
      )

      if (!item) {
        return
      }

      updateItem({ ...item, quantity })
    },
    [localItems, updateItem]
  )

  const value = React.useMemo(
    () => ({
      items: localItems,
      setItems: setLocalItems,
      updateItem,
      getItem,
      updateQuantityBySkuReferenceCode,
    }),
    [localItems, updateItem, getItem, updateQuantityBySkuReferenceCode]
  )

  useEffect(() => {
    setLocalItems(items)
  }, [items])

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}

const useProducts = () => {
  const context = React.useContext(ProductsContext)

  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }

  return context
}

export { ProductsProvider, useProducts }
