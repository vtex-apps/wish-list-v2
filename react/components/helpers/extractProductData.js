const extractProductData = ({ products }) => {
  if (products !== undefined) {
    return products.map((item) => {
      const productData = {
        id: item.ID,
        image: item.Image,
        department: item.department,
        skuReferenceCode: item.skuCodeReference,
        name: item.nameProduct,
        qty: item.quantityProduct,
        unitValue: item.unitValue,
        totalValue: item.unitValue * item.quantityProduct,
        linkProduct: item.linkProduct,
      }

      if (item.bundle) {
        productData.bundle = item.bundle
      }

      return productData
    })
  }
}

export default extractProductData
