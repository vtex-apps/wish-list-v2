import { useQuery } from 'react-apollo'
import PRODUCT_QUERY from '../../graphql/queries/productPrice.graphql'

const useQueryWishlists = (field: string, idValue: number | string) => {
    const { data, error, loading, refetch } = useQuery(PRODUCT_QUERY, {
        variables: {
            identifier: { field: field, value: idValue },
        },
        notifyOnNetworkStatusChange: true,
    })

  return {
    data,
    loading,
    error,
    refetch,
  }
}

export default useQueryWishlists
