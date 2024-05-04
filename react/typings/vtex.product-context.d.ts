declare module 'vtex.product-context/useProduct' {
  const useProduct: () => ProductContext
  export default useProduct
}

declare module 'vtex.product-context' {
  export interface ProductContext {
    selectedQuantity: number
    selectedItem?: SelectedItem
  }

  interface SelectedItem {
    itemId: string
    unitMultiplier: number
    measurementUnit: string
    sellers: Array<{
      commertialOffer: {
        AvailableQuantity: number
      }
      sellerDefault: boolean
    }>
  }

  const useProduct: () => ProductContext
  export default useProduct
}

declare module 'vtex.product-context/ProductDispatchContext' {
  type DispatchFunction = (payload: { type: string; args?: unknown }) => void
  export const useProductDispatch: () => DispatchFunction
}
