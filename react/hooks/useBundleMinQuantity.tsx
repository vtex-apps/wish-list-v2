const useBundleMinQuantity = (productContextValue: {
  properties: any[]
}): number => {
  const productBundleMinQty = productContextValue?.properties.find(
    (property: { name: string }) => property.name === 'UnitMultiplier'
  )?.values[0]

  const productBundleMinQtyNumber = productBundleMinQty
    ? Number(productBundleMinQty)
    : 1

  return productBundleMinQtyNumber
}

export default useBundleMinQuantity
