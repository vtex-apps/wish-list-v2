import { useQuery } from 'react-apollo'

import PRODUCT_QUERY from '../../graphql/queries/productPrice.graphql'

const useQueryProductByIdentifier = (field: string, itemId: number) => {
  const { data, error, loading } = useQuery(PRODUCT_QUERY, {
    variables: {
      identifier: { field, value: itemId },
    },
    notifyOnNetworkStatusChange: true,
  })

  const getProperty = (name: string) => {
    const selectedSku = data?.product?.items?.find(
      (item) => item.itemId === itemId?.toString()
    )

    if (name === 'productName') return data?.product?.productName
    if (name === 'productDescription') return data?.product?.description
    if (name === 'productNameWithSkuName')
      return `${data?.product?.productName} - ${selectedSku?.name ?? ''}`

    return ''
  }

  return {
    data,
    getProperty,
    loading,
    error,
  }
}

export default useQueryProductByIdentifier
