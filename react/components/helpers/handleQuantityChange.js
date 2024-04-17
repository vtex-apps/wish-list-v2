const handleQuantityChange = (setPaginatedData, newData) => {
  const newPaginatedData = newData.map((item) => {
    return {
      id: item.ID,
      image: item.Image,
      department: item.department,
      skuReferenceCode: item.skuCodeReference,
      name: item.nameProduct,
      qty: item.quantityProduct,
      unitValue: item.unitValue,
      totalValue: item.unitValue * item.quantityProduct,
      linkProduct: item.linkProduct,
      bundle: item.bundle,
    }
  })

  setPaginatedData(newPaginatedData)
}

export default handleQuantityChange
