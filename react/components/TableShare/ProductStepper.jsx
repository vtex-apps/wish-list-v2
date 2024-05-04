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

    const quantity = finalValue;
    const minimumQuantity = bundle || 1;
    const maximumQuantity = qtyRef.current;

    if (eventType === 'click') {
        if (quantity < minimumQuantity) {
            finalValue = minimumQuantity;
        } else if (quantity === maximumQuantity) {
            finalValue = quantity - minimumQuantity + 1;
        } else {
            finalValue = quantity + minimumQuantity;
        }
    } else if (eventType === 'change') {
        const roundedQty = Math.ceil(quantity / minimumQuantity) * minimumQuantity;
        finalValue = Math.max(minimumQuantity, Math.min(roundedQty, maximumQuantity));
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
