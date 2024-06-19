const extractProductData = ({ items }) => {
  return items?.map(
    ({
      ID,
      Image,
      department,
      skuCodeReference,
      nameProduct,
      quantityProduct,
      linkProduct,
      bundle,
      notes,
      skuName,
      description,
    }) => {
      const pr = {
        id: ID,
        itemId: ID,
        image: Image,
        department,
        skuReferenceCode: skuCodeReference,
        name: nameProduct,
        quantity: quantityProduct,
        linkProduct,
        bundle: bundle || null,
        notes,
        skuName,
        description,
      }

      return pr
    }
  )
}

export default extractProductData
