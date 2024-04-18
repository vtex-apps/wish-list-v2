import React, { useState, useEffect, useRef } from 'react'
import { NumericStepper } from 'vtex.styleguide'

export const ProductStepper = ({
  initialQty,
  handleQuantityChange,
  bundle,
  setIsUpdatingQty,
  productId,
}) => {
  // Hooks y funciones de utilidad...
  const [QTY, setQTY] = useState(initialQty)
  const qtyRef = useRef(initialQty)

  useEffect(() => {
    qtyRef.current = QTY
  }, [QTY])

  useEffect(() => {
    setQTY(initialQty)
  }, [initialQty])

  const modifyProductQTY = (newValue, eventType) => {
    // Lógica para modificar la cantidad del producto...
    setIsUpdatingQty(true)

    let finalValue = 0 + newValue

    if (bundle) {
      if (eventType === 'click') {
        if (finalValue < bundle) {
          finalValue = bundle
        } else if (finalValue < QTY) {
          finalValue = QTY - bundle
        } else {
          finalValue = QTY + bundle
        }
      }

      if (eventType === 'change') {
        if (finalValue < bundle) {
          finalValue = bundle
        } else {
          finalValue -= finalValue % bundle
        }
      }
    }

    setQTY(finalValue)
    handleQuantityChange(productId, finalValue)
    handleQuantityChange(finalValue)

    handleQuantityChange(productId, finalValue)
  }

  return (
    <NumericStepper
      value={QTY}
      size="small"
      onChange={(e) => {
        const newValue = e.value

        setQTY(newValue)
        modifyProductQTY(newValue, e.type)
      }}
    />
  )
}
