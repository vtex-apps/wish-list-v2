import type { InstanceOptions, IOContext } from "@vtex/api";
import { ExternalClient } from "@vtex/api";
import { DATA_ENTITY_NAME, FIELDS, SCHEMA } from "../utils/constant";
import { Wishlist } from "../typings/wishlist";

export default class MasterDataClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`https://${context.account}.vtexcommercestable.com.br`, context, {
      ...options,
      headers: {
        ...options?.headers,
        ...{ Accept: "application/vnd.vtex.ds.v10+json" },
        ...(context.authToken
          ? { VtexIdclientAutCookie: context.authToken }
          : null),
      },
    });
  }

  public async getWishlist(id: string): Promise<Wishlist> {
    try {
      return await this.http.get(
        `/api/dataentities/${DATA_ENTITY_NAME}/documents/${id}?_fields=${FIELDS}&_schema=${SCHEMA}`
      );
    } catch (error) {
      return error;
    }
  }

  public async searchWistlist(
    field: string,
    value: string,
    pagination?: { page: number; pageSize: number }
  ): Promise<Wishlist[]> {
    const { page, pageSize } = pagination ?? {};

    try {
      return await this.http.get(
        `/api/dataentities/${DATA_ENTITY_NAME}/search?_where=(${field}=${value})&_fields=${FIELDS}&_sort=createdIn&_schema=${SCHEMA}`,
        {
          headers: {
            "REST-Range": `resources=${page ?? 0}-${pageSize ?? 100}`,
          },
        }
      );
    } catch (error) {
      return error;
    }
  }

  public async createWishlist(payload: Wishlist) {
    try {
      return await this.http.post(
        `/api/dataentities/${DATA_ENTITY_NAME}/documents?_schema=${SCHEMA}`,
        payload
      );
    } catch (error) {
      return error;
    }
  }

  public async updateWishlist(id: string, payload: Wishlist) {
    try {
      return await this.http.patch(
        `/api/dataentities/${DATA_ENTITY_NAME}/documents/${id}?_schema=${SCHEMA}`,
        payload
      );
    } catch (error) {
      return error;
    }
  }

  public async deleteWishlist(id: string) {
    try {
      return await this.http.delete(
        `/api/dataentities/${DATA_ENTITY_NAME}/documents/${id}?_schema=${SCHEMA}`
      );
    } catch (error) {
      return error;
    }
  }
}
