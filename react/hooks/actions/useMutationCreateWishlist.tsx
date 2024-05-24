import { useMutation } from 'react-apollo'

import CREATE_WISHLIST from '../../graphql/mutations/createWishlist.gql'

const useMutationCreateWishlist = (callback: (data: any) => void) => {
  const [createWishlist] = useMutation(CREATE_WISHLIST, {
    onCompleted: callback,
  })

  return {
    createWishlist,
  }
}

export default useMutationCreateWishlist
