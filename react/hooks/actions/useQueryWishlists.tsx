import { useQuery } from 'react-apollo'
import { useEffect } from 'react'

import GET_WISHLISTS from '../../graphql/queries/getWishlists.gql'

const useQueryWishlists = () => {
  const { data, loading, error, refetch } = useQuery(GET_WISHLISTS, {
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    let retryCount = 0
    const maxRetries = 3
    const retryTimeout = 1000

    const handleRetry = async () => {
      if (error && retryCount < maxRetries) {
        retryCount += 1
        await new Promise((resolve) => setTimeout(resolve, retryTimeout))
        refetch()
      }
    }

    handleRetry()
  }, [error, refetch])

  return {
    data,
    loading,
    error,
    refetch,
  }
}

export default useQueryWishlists
