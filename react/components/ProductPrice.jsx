import React, { useEffect } from "react"
import { useQuery } from 'react-apollo'
import { Checkbox, Pagination, Spinner } from 'vtex.styleguide'
// import GET_PRODUCT_PRICES from '../graphql/queries/getPriceBySkuId.gql'
import PRODUCT_QUERY from '../graphql/queries/productPrice.graphql'

const ProductPrice = ({ skuId = 0, skuReference = 0, productQuantity = 0, currency = '$' }) => {

    // const { data, loading, error, refetch } = useQuery(GET_PRODUCT_PRICES, {        
    //     variables: {
    //         skuId,
    //         skuReference,
    //         productQuantity
    //       },
    //   })

    const { data, error: productError, loading, refetch } = useQuery(PRODUCT_QUERY, {
        variables: {
            identifier: { field: 'reference', value: skuReference },
        },
    })

    useEffect(() => {
        refetch()
    }, [productQuantity])

    const price = (data?.product.items ?? []).find((item) => item)?.sellers?.find((seller) => seller)?.commertialOffer?.Price

    const handlePrice = () => {
        if (productQuantity && price) {
            const lineTotal = productQuantity * price
            return `${currency} ${parseFloat(lineTotal).toFixed(2)}`
        }
    }

    if (productError) {
        return <div>Error</div>
    }

    if (loading) {
        return <Spinner size={20} />
    }

    return (
        <div className="w-100 flex items-center justify-end">
            {handlePrice()}
        </div>
    )
}

export default ProductPrice