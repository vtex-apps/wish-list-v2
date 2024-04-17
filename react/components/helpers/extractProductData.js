const extractProductData = ({ products }) => {
  if (products === undefined) {
    return
  }

  return products.map((item) => ({
    id: item.ID,
    image: item.Image,
    department: item.department,
    skuReferenceCode: item.skuCodeReference,
    name: item.nameProduct,
    qty: item.quantityProduct,
    unitValue: item.unitValue,
    totalValue: item.unitValue * item.quantityProduct,
    linkProduct: item.linkProduct,
    bundle: item.bundle || null,
  }))
}

export default extractProductData
