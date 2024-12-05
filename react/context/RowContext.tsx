import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { useProducts } from './ProductsContext'

type RowContextType = {
  row: any
  updateQuantity: (quantity: number) => void
}
const RowContext = React.createContext<RowContextType | null>(null)

const RowProvider = ({
  children,
  row: rowData,
}: {
  children: React.ReactNode
  row: any
}) => {
  const { getItem } = useProducts()
  const row = getItem(rowData.itemId)
  const [localRow, setLocalRow] = useState<any>(row)

  const updateQuantity = useCallback(
    (quantity: number) => {
      setLocalRow({ ...localRow, quantity })
    },
    [localRow]
  )

  useEffect(() => {
    setLocalRow(row)
  }, [row])

  const value = useMemo(() => ({ row: localRow, updateQuantity }), [
    localRow,
    updateQuantity,
  ])

  return <RowContext.Provider value={value}>{children}</RowContext.Provider>
}

const useRow = () => {
  const context = React.useContext(RowContext)

  if (!context) {
    throw new Error('useRow must be used within a RowProvider')
  }

  return context
}

export { RowProvider, useRow }
