/* eslint-disable no-console */
const extractProductData = ({ items }) => {
  console.log('items : ', items)

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
      notes,
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
        notes,
      }

      return pr
    }
  )
}

export default extractProductData
