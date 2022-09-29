import { useParams } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
import Plus from "../../img/plus.png";
const Product = () => {
  const { id } = useParams();
  const { data: product } = useFatch(`http://localhost:8000/products/${id}`);
  return (
    <div>
      {product && (
        <article className="product-cart">
          <header>
            <div>
              <img
                src={require(`../../img/icons8/${product.icon}`)}
                className="product-icon"
              />
              <h4>{product.name}</h4>
            </div>
            <img src={Plus} alt="" />
          </header>
          <section></section>
          <footer></footer>
        </article>
      )}
    </div>
  );
};

export default Product;
