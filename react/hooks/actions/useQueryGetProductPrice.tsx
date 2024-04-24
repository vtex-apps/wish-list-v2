import { useQuery } from "react-apollo";

import PRODUCT_QUERY from "../../graphql/queries/productPrice.graphql";

const useQueryWishlists = (
  field: string,
  idValue: number | string,
  quantity: number
) => {
  const { data, error, loading } = useQuery(PRODUCT_QUERY, {
    variables: {
      identifier: { field, value: idValue },
    },
    notifyOnNetworkStatusChange: true,
  });

  const price =
    (data?.product.items ?? [])
      .find((item) => item)
      ?.sellers?.find((seller) => seller)?.commertialOffer?.Price * quantity ??
    null;

  return {
    price,
    loading,
    error,
  };
};

export default useQueryWishlists;
