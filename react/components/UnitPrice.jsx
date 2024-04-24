import React from "react";
import { Spinner } from "vtex.styleguide";

import useQueryGetProductPrice from "../hooks/actions/useQueryGetProductPrice";
import styles from "./unitPrice.css";

const UnitPrice = ({ skuReference = 0, currency = "$" }) => {
  const { price, error: productError, loading } = useQueryGetProductPrice(
    "reference",
    skuReference,
    1
  );

  return productError ? (
    <div className={`${styles.unitPriceContainer}`}>
      <span>Error</span>
    </div>
  ) : loading ? (
    <div className={`${styles.unitPriceContainer}`}>
      <Spinner size={20} />
    </div>
  ) : (
    <div className={`${styles.unitPriceContainer}`}>
      {`${currency} ${price ? parseFloat(price).toFixed(2) : null}`}
    </div>
  );
};

export default UnitPrice;
