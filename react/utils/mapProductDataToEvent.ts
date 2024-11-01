import { ExtractedWishlistProductItem } from '../interfaces'
import { ProductSearchApi } from '../interfaces/productSearchApi'
import getProductsBySkuIds from './getProductsBySkuIds'

interface ItemToEvent {
  item_variant: string
  item_name: string
  quantity: number
  product_reference_id: string
  item_brand: string
  item_id: string
  price: number
  discount?: number
  currency: string
  item_variant_name: string
}

export default async function mapProductDataToEvent(
  items: ExtractedWishlistProductItem[],
  currency: string
): Promise<ItemToEvent[]> {
  const skuIds = items.map((item) => item.itemId)

  const products: ProductSearchApi[] = await getProductsBySkuIds(skuIds)

  const result = items.map((item) => {
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

    return {
      item_variant: item.itemId.toString(),
      item_name: item.name,
      quantity: item.quantity,
      product_reference_id: item.skuReferenceCode,
      item_brand: matchedProduct ? matchedProduct.brand : '',
      item_id: matchedProduct ? matchedProduct.productId : '',
      price: matchedItem?.sellers[0]?.commertialOffer.Price || 0,
      discount: undefined,
      currency,
      item_variant_name: matchedItem ? matchedItem.name : '',
    }
  })

  return result
}
