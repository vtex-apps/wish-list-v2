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
      quantity,
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
        quantity,
        unitValue,
        totalValue: unitValue * quantity,
        linkProduct,
        bundle: bundle || null,
      }

      console.log('pr : ', pr)

      return pr
    }
  )
}

export default extractProductData
