import { useEffect, useState } from "react";
import useFatch from "../customHooks/useFetch";
import banan from "../../img/icons8/banan.png";
import Plus from "../../img/plus.png";
const ProductList = () => {
  const { data: productData } = useFatch("http://localhost:8000/products");

  return (
    <section className="product-list">
      {productData &&
        productData.map((product) => (
          <div key={product.id} className="product-cart-small">
            <img
              src={require(`../../img/icons8/${product.icon}`)}
              className="product-icon"
            />
            <h4>{product.name}</h4>
            <img src={Plus} alt="" />
          </div>
        ))}
    </section>
  );
};

export default ProductList;
