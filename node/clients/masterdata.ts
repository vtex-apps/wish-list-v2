import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

import { DATA_ENTITY_NAME, FIELDS, SCHEMA_NAME } from '../utils/constant'
import { Wishlist } from '../typings/wishlist'

export default class MasterDataClient extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdclientAutCookie: context.authToken,
        Accept: 'application/vnd.vtex.pricing.v3+json',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
    })
  }

  public async getWishlist(id: string): Promise<Wishlist> {
    return this.http.get(
      `/api/dataentities/${DATA_ENTITY_NAME}/documents/${id}?_fields=${FIELDS}&_schema=${SCHEMA_NAME}`
    )
  }

  public async searchWistlist(
    field: string,
    value: string,
    pagination?: { page: number; pageSize: number }
  ): Promise<Wishlist[]> {
    const { page, pageSize } = pagination ?? {}

    return this.http.get(
      `/api/dataentities/${DATA_ENTITY_NAME}/search?_where=${field}=${value}&_fields=${FIELDS}&_sort=createdIn&_schema=${SCHEMA_NAME}`,
      {
        headers: {
          'REST-Range': `resources=${page ?? 0}-${pageSize ?? 100}`,
        },
      }
    )
  }

  public async createWishlist(payload: Wishlist) {
    return this.http.post(
      `/api/dataentities/${DATA_ENTITY_NAME}/documents?_schema=${SCHEMA_NAME}`,
      payload
    )
  }

  public async updateWishlist(id: string, payload: Wishlist) {
    return this.http.patch(
      `/api/dataentities/${DATA_ENTITY_NAME}/documents/${id}?_schema=${SCHEMA_NAME}`,
      payload
    )
  }

  public async deleteWishlist(id: string) {
    return this.http.delete(
      `/api/dataentities/${DATA_ENTITY_NAME}/documents/${id}?_schema=${SCHEMA_NAME}`
    )
  }
}
