import { WishlistProductItem } from '../../interfaces'

const extractProductData = ({ items }): WishlistProductItem[] => {
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
      }

      return pr
    }
  )
}

export default extractProductData
