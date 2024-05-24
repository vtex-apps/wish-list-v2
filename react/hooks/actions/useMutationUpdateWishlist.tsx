import { useMutation } from 'react-apollo'

import UPDATE_WISHLIST from '../../graphql/mutations/updateWishlist.gql'

const useMutationUpdateWishlist = (callback) => {
  const [updateWishlist] = useMutation(UPDATE_WISHLIST, {
    onCompleted: async () => {
      await callback()
    },
  })

  return {
    updateWishlist,
  }
}

export default useMutationUpdateWishlist
