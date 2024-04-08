const formatProductForWishlist = (list) => {
  const formattedList = list?.map((item) => ({
    ID: item.id,
    bundle: item.bundle,
    Image: item.image,
    unitValue: item.unitValue,
    linkProduct: item.linkProduct,
    nameProduct: item.name,
    quantityProduct: item.qty,
    skuCodeReference: item.skuReferenceCode,
    department: item.department,
  }))

  return formattedList
}

export default formatProductForWishlist
