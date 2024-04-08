import { useQuery } from 'react-apollo'

import GET_WISHLISTS from '../../graphql/queries/getWishlists.gql'

const useQueryWishlists = () => {
  const { data, loading, error, refetch } = useQuery(GET_WISHLISTS, {
    fetchPolicy: 'network-only',
  })

  return {
    data,
    loading,
    error,
    refetch,
  }
}

export default useQueryWishlists
