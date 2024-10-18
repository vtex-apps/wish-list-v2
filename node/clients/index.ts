import { IOClients } from '@vtex/api'
import { masterDataFor } from '@vtex/clients'

import { Wishlist } from '../typings/wishlist'
import MasterDataClient from './masterdata'
import VtexId from './vtexId'
import { DATA_ENTITY_NAME } from '../utils/constant'
import RequestHub from '../utils/HUB'
import ProductSearchClient from './product'

export class Clients extends IOClients {
  public get wishlist() {
    return this.getOrSet(
      'wishlist',
      masterDataFor<Wishlist>(DATA_ENTITY_NAME, undefined, 2)
    )
  }

  public get md() {
    return this.getOrSet('md', MasterDataClient)
  }

  public get vtexId() {
    return this.getOrSet('vtexId', VtexId)
  }

  public get hub() {
    return this.getOrSet('hub', RequestHub)
  }

  public get product() {
    return this.getOrSet('product', ProductSearchClient)
  }
}
