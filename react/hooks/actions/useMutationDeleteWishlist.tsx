import { useMutation } from 'react-apollo'

import DELETE_WISHLIST from '../../graphql/mutations/deleteWishlist.gql'

const useMutationDeleteWishlist = (
  wishlistId: string,
  callback: () => void
) => {
  const [deleteWishlist, { loading, error }] = useMutation(DELETE_WISHLIST, {
    variables: {
      id: wishlistId,
    },
    onCompleted: () => {
      callback()
    },
  })

  return { deleteWishlist, loading, error }
}

export default useMutationDeleteWishlist
