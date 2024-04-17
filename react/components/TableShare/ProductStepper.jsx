/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { NumericStepper } from 'vtex.styleguide'
import debounce from 'lodash.debounce'

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

  const debouncedUpdateProducts = useCallback(
    debounce((newQty) => {
      // Lógica para manejar la actualización de la cantidad de productos...
      handleQuantityChange(productId, newQty)
      // Asegúrate de que esta función actualice el estado global según sea necesario
      handleQuantityChange(newQty)
    }, 2000),
    [productId, handleQuantityChange]
  )

  // Efectos y funciones relacionadas con el stepper...
  useEffect(() => {
    return () => {
      debouncedUpdateProducts.cancel()
    }
  }, [debouncedUpdateProducts])

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
    debouncedUpdateProducts(finalValue)
    // Asegúrate de que esta línea está llamando a handleQuantityChange
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
