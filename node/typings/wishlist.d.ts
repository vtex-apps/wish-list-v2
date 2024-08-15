export interface Wishlist {
  id: string
  email: string
  wishlistType: string
  products: Products[]
  isPublic: boolean
  fieldsConfig?: FieldsConfig
}

export interface FieldsConfig {
  department: string
  description: string
}

export interface Products {
  ID: number
  Image: string
  unitValue: number
  linkProduct: string
  nameProduct: string
  quantityProduct: number
  skuCodeReference: string
  department: string
  bundle: number
  price: number
  notes: string
}

export interface WishlistUpdateArs extends Wishlist {
  id: string
  wishlist: Wishlist
}

export type WishlistInput = {
  wishlist: Wishlist
}
