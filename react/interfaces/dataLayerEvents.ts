export interface ItemToEvent {
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

export interface EcommerceEvent {
  currency: string
  value: number
  items: ItemToEvent[]
}
