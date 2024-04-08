import { useOrderForm } from 'vtex.order-manager/OrderForm';

export const useUserEmail = () => {
  const { orderForm } = useOrderForm();
  const email = orderForm?.clientProfileData?.email;
  return email;
}

