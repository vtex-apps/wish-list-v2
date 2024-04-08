const useBundleMinQuantity = (productContextValue): number | undefined => {
  const productBundleMinQty = productContextValue?.properties.find(
    (property) => property.name === 'UnitMultiplier'
  )?.values[0]

  const productBundleMinQtyNumber = productBundleMinQty
    ? Number(productBundleMinQty)
    : undefined

  return productBundleMinQtyNumber
}

export default useBundleMinQuantity
