import { useQuery } from 'react-apollo'
import { useEffect, useRef } from 'react'

import GET_WISHLISTS from '../../graphql/queries/getWishlists.gql'

const MAX_RETRIES = 3
const RETRY_TIMEOUT_MS = 1000
const NON_RETRYABLE_CODES = ['FORBIDDEN', 'UNAUTHENTICATED']

/* Auth errors will not change on retry, so retrying them only adds load. */
const isRetryable = (error: any) =>
  !error?.graphQLErrors?.some((graphQLError: any) =>
    NON_RETRYABLE_CODES.includes(graphQLError?.extensions?.exception?.code)
  )

const useQueryWishlists = ({ skip = false }: { skip?: boolean } = {}) => {
  const { data, loading, error, refetch } = useQuery(GET_WISHLISTS, {
    fetchPolicy: 'network-only',
    skip,
  })

  /* Kept in a ref: each failed refetch yields a new error object, which would reset a local counter. */
  const retryCount = useRef(0)
  const refetchRef = useRef(refetch)

  refetchRef.current = refetch

  useEffect(() => {
    if (!error) {
      if (data) {
        retryCount.current = 0
      }

      return undefined
    }

    if (!isRetryable(error) || retryCount.current >= MAX_RETRIES) {
      return undefined
    }

    retryCount.current += 1

    const timer = setTimeout(() => {
      refetchRef.current().catch(() => {})
    }, RETRY_TIMEOUT_MS)

    return () => clearTimeout(timer)
  }, [error, data])

  return {
    data,
    loading,
    error,
    refetch,
  }
}

export default useQueryWishlists
