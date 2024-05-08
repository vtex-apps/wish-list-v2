const formatProductForWishlist = (list) =>
  list.map((item) => ({
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

export default formatProductForWishlist
