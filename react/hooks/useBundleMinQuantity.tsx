const useBundleMinQuantity = (productContextValue: { properties: any[] }): number => {
  const unitMultiplier = productContextValue?.properties?.find(
    (property) => property.name === 'UnitMultiplier'
  )?.values?.[0]

  return Number(unitMultiplier) || 1
}

export default useBundleMinQuantity