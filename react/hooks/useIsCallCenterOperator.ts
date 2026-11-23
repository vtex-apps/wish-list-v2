import { useOrderForm } from 'vtex.order-manager/OrderForm'

/* Wishlists are personal: telemarketing operators get no wishlist UI, and the API refuses them while impersonating. */
const useIsCallCenterOperator = () => {
  const { orderForm } = useOrderForm()

  return orderForm?.userType === 'CALL_CENTER_OPERATOR'
}

export default useIsCallCenterOperator
