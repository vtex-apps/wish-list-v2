import React from 'react'
import { useQuery } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'
import { Spinner } from 'vtex.styleguide'

import GET_WISHLIST_BY_ID from '../graphql/queries/getWishlistById.gql'
import { WishlistMD } from '../interfaces'
import AppSettings from '../queries/AppSettings.graphql'
import styles from '../styles.css'
import TableShare from './TableShare'

export default function WishlistShare() {
  const { query } = useRuntime()
  const { id } = query

  const { data, loading } = useQuery(GET_WISHLIST_BY_ID, {
    variables: { id },
    ssr: false,
    fetchPolicy: 'network-only',
  })

  const { data: wishlistColumns } = useQuery(AppSettings, {
    variables: {
      // eslint-disable-next-line no-undef
      version: process.env.VTEX_APP_VERSION,
    },
    ssr: false,
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

  const wishlistMD: WishlistMD = data?.getWishlist || {
    products: [],
    email: '',
  }

  const { defaultTitleText } = JSON.parse(
    wishlistColumns.publicSettingsForApp.message
  )

  return (
    <div className={`${styles.wishlistShare}`}>
      <h2 className="flex justify-center mt6">
        {`${wishlistMD.email}'s ${defaultTitleText ?? 'Favorites List'}`}
      </h2>
      {wishlistMD.products && (
        <TableShare
          wishlistMD={wishlistMD}
          columns={wishlistColumns}
          queryId={id}
        />
      )}
    </div>
  )
}
