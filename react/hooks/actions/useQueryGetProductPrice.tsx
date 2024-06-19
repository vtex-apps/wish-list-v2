import { useQuery } from 'react-apollo'

import PRODUCT_QUERY from '../../graphql/queries/productPrice.graphql'

const useQueryWishlists = (field: string, itemId: number, quantity: number) => {
  const { data, error, loading } = useQuery(PRODUCT_QUERY, {
    variables: {
      identifier: { field, value: itemId },
    },
    notifyOnNetworkStatusChange: true,
  })

  const unitPrice = (data?.product.items ?? [])
    .find((item) => item.itemId === itemId?.toString())
    ?.sellers?.find((seller) => seller)?.commertialOffer?.Price

  const price = unitPrice ? unitPrice * quantity : 0

  return {
    price,
    loading,
    error,
  }
}

export default useQueryWishlists
