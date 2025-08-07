export const handleInputSearchChange = ({
  e,
  allProducts,
  setSearchValue,
  setDisplayedProducts,
}) => {
  const { value } = e.target

  setSearchValue(value)

  if (!value) {
    setDisplayedProducts(allProducts)
  } else {
    const filteredProducts = allProducts.filter((product) => {
      const valueLower = value.toLowerCase()
      const nameMatches = product.name?.toLowerCase().includes(valueLower) || false
      const departmentMatches = product.department
        ?.toLowerCase()
        .includes(valueLower) || false

      const skuMatches = product.skuReferenceCode
        ?.toLowerCase()
        .includes(valueLower) || false

      return nameMatches || departmentMatches || skuMatches
    })

    setDisplayedProducts(filteredProducts)
  }
}

export const handleInputSearchClear = (setDisplayedProducts, allProducts) =>
  setDisplayedProducts(allProducts)

export const handleInputSearchSubmit = ({
  e,
  allProducts,
  searchValue,
  setDisplayedProducts,
}) => {
  e.preventDefault()

  if (!searchValue) {
    setDisplayedProducts(allProducts)
  } else {
    const filteredProducts = allProducts.filter((product) => {
      const searchValueLower = searchValue.toLowerCase()
      const nameMatches = product.name?.toLowerCase().includes(searchValueLower) || false
      const departmentMatches = product.department
        ?.toLowerCase()
        .includes(searchValueLower) || false

      const skuMatches = product.skuReferenceCode
        ?.toLowerCase()
        .includes(searchValueLower) || false

      return nameMatches || departmentMatches || skuMatches
    })

    setDisplayedProducts(filteredProducts)
  }
}
