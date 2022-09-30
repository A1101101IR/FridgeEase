import { useEffect, useState } from "react";
import useFatch from "../customHooks/useFetch";
import banan from "../../img/icons8/banan.png";
import Plus from "../../img/plus.png";
import { Link } from "react-router-dom";
const ProductList = () => {
  const { data: productData } = useFatch("http://localhost:8000/products");

  return (
    <section className="product-list">
      {productData &&
        productData.map((product) => (
          <Link
            to={`/productlist/${product.id}`}
            key={product.id}
            className="product-cart-small"
          >
            <img
              src={require(`../../img/icons8/${product.icon}`)}
              className="product-icon"
            />
            <h4 className="cart-headline-bold">{product.name}</h4>
            <img src={Plus} className="plusBTN" alt="" />
          </Link>
        ))}
    </section>
  );
};

export default ProductList;
