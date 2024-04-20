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

    const qty = finalValue
    const minQty = bundle || 1
    const maxQty = qtyRef.current

    if (eventType === 'click') {
      finalValue =
        qty < minQty ? minQty : qty === maxQty ? qty - minQty + 1 : qty + minQty
    } else if (eventType === 'change') {
      finalValue = Math.max(
        minQty,
        Math.min(Math.ceil(qty / minQty) * minQty, maxQty)
      )
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
