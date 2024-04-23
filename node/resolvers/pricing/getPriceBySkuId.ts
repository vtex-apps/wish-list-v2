export const getPriceBySkuId = async (
  _: unknown,
  args: {
    skuId: number;
    skuReference: string;
    productQuantity: number;
  },
  ctx: Context
) => {
  const {
    clients: { pricing },
  } = ctx;

  const { skuId, skuReference, productQuantity } = args;

  try {
    if (skuReference && productQuantity) {
      // use if needed
    }

    const pricingData = await pricing.getPriceBySkuId(skuId);

    return pricingData;
  } catch (error) {
    console.error("getPriceBySkuId error: ", error);
    return error;
  }
};
