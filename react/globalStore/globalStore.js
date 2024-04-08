import create from 'zustand'
import { devtools } from 'zustand/middleware'

const logMiddleware = (config) => (set, get, api) =>
  config(
    (args) => {
      set(args)
    },
    get,
    api
  )

const useStoreGlobal = create(
  devtools(
    logMiddleware((set) => ({
      selectedWishlist: null,
      isUpdatingQty: false,
      wishlists: [],
      wishlist: [],
      setSelectedWishlist: (wishlist) => {
        set({ selectedWishlist: wishlist })
      },
      setIsUpdatingQty: (updating) => set({ isUpdatingQty: updating }),
      setWishlist: (wishlistData) => set({ wishlist: wishlistData }),
      setWishlists: (wishlistsData) => {
        set({ wishlists: wishlistsData })
      },
      updatedProducts: [],
      setUpdatedProducts: (products) => set({ updatedProducts: products }),
    })),
    'Nombre-DevTools'
  )
)

export default useStoreGlobal
