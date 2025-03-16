import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'
import { Product } from 'vtex.product-context/react/ProductTypes'

export default class ProductSearchClient extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdclientAutCookie: context.authToken,
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
    })
  }

  public async getProducts(
    skuIdArray: string[]
  ): Promise<Product[] | undefined> {
    if (skuIdArray.length === 0) return []

    const queryString = skuIdArray.map((skuId) => `fq=skuId:${skuId}`).join('&')

    return this.http.get(
      `/api/catalog_system/pub/products/search?${queryString}`
    )
  }
}
