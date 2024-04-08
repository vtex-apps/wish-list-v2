import React, { useEffect, useState } from "react";
import extractProductData from "./helpers/extractProductData";
import { useRuntime } from "vtex.render-runtime";
import { Spinner } from "vtex.styleguide";
import TableShare from "./TableShare";

export default function WishlistShare() {
  const [products, setProducts] = useState([]);
  const [nameWishList, setNameWishList] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { query } = useRuntime();
  const { id } = query;

  const getWishlist = async () => {
    if (id) {
      const res = await fetch(
        `/api/dataentities/whitebird_my_wishlists_wishlist/documents/${id}?_fields=id,email,wishlistType,products&_schema=0.0.2-mywishlists`,
      );
      if (res.ok) {
        const data = await res.json();
        const products = extractProductData(data);
        setProducts(products);
        setNameWishList(data?.wishlistType);
        setEmail(data?.email);
      }
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWishlist();
  }, [id]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <Spinner color="black" size={20} />
      </div>
    );
  }

  return (
    <div>
      <h2 className="flex justify-center mt6">
        {nameWishList ? nameWishList : `${email}'s Favourites List`}
      </h2>
      {products && <TableShare products={products} queryId={id} />}
    </div>
  );
}
