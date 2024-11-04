import { ExtractedWishlistProductItem } from '../interfaces'
import { EcommerceEvent, ItemToEvent } from '../interfaces/dataLayerEvents'
import { ProductSearchApi } from '../interfaces/productSearchApi'
import getProductsBySkuIds from './getProductsBySkuIds'

export default async function mapProductDataToEvent(
  items: ExtractedWishlistProductItem[],
  currency: string
): Promise<EcommerceEvent> {
  const skuIds = items.map((item) => item.itemId)

  const products: ProductSearchApi[] = await getProductsBySkuIds(skuIds)

  let totalValue = 0

  const mappedItems: ItemToEvent[] = items.map((item) => {
    let matchedItem: ProductSearchApi['items'][0] | undefined
    let matchedProduct: ProductSearchApi | undefined

    for (const product of products) {
      matchedItem = product.items.find(
        (prodItem) => prodItem.itemId === item.itemId.toString()
      )
      if (matchedItem) {
        matchedProduct = product
        break
      }
    }

    const price = matchedItem?.sellers[0]?.commertialOffer.Price ?? 0
    const { quantity } = item
    const itemTotal = price * quantity

    totalValue += itemTotal

    return {
      item_variant: item.itemId.toString(),
      item_name: item.name,
      quantity,
      product_reference_id: item.skuReferenceCode,
      item_brand: matchedProduct ? matchedProduct.brand : '',
      item_id: matchedProduct ? matchedProduct.productId : '',
      price,
      discount: 0,
      currency,
      item_variant_name: matchedItem ? matchedItem.name : '',
    }
  })

  return {
    currency,
    value: totalValue,
    items: mappedItems,
  }
}
