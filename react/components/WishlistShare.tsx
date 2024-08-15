import React from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { Spinner } from 'vtex.styleguide'
import { useQuery } from 'react-apollo'

import TableShare from './TableShare'
import GET_WISHLIST_BY_ID from '../graphql/queries/getWishlistById.gql'

export default function WishlistShare() {
  const { query } = useRuntime()
  const { id } = query

  const { data, loading } = useQuery(GET_WISHLIST_BY_ID, {
    variables: { id },
    ssr: false,
    fetchPolicy: 'network-only',
  })

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '60vh',
        }}
      >
        <Spinner color="black" size={20} />
      </div>
    )
  }

  const { products, email } = data?.getWishlist || { products: [], email: '' }

  return (
    <div>
      <h2 className="flex justify-center mt6">
        {`${email}'s Favourites List`}
      </h2>
      {products && <TableShare products={products} queryId={id} />}
    </div>
  )
}
