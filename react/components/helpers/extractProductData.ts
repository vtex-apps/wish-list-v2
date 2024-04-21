const extractProductData = ({ items }) => {
  return items?.map(
    ({
      ID,
      Image,
      department,
      skuCodeReference,
      nameProduct,
      quantityProduct,
      unitValue,
      linkProduct,
      bundle,
    }) => {
      const pr = {
        id: ID,
        image: Image,
        department,
        skuReferenceCode: skuCodeReference,
        name: nameProduct,
        quantity: quantityProduct,
        unitValue,
        totalValue: unitValue * quantityProduct,
        linkProduct,
        bundle: bundle || null,
      }

      return pr
    }
  )
}

export default extractProductData
