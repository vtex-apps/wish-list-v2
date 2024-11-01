import { ProductSearchApi } from '../interfaces/productSearchApi'

export default async function getProductsBySkuIds(
  skuIdArray: Array<string | number>
): Promise<ProductSearchApi[]> {
  if (skuIdArray.length === 0) return []

  const requestResponse = await fetch(
    `/api/catalog_system/pub/products/search?${skuIdArray
      .map((skuId) => `fq=skuId:${skuId}`)
      .join('&')}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
      },
    }
  )

  const response = await requestResponse.json()

  return response
}
