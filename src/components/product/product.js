import { useParams, useNavigate } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
import Plus from "../../img/plus.png";
import Close from "../../img/close.png";
const Product = () => {
  const { id } = useParams();
  const { data: product } = useFatch(`http://localhost:8000/products/${id}`);
  const navigate = useNavigate();
  return (
    <div className="product-cart-container">
      {product && (
        <article className="product-cart">
          <header>
            <div className="flex-center">
              <img
                src={require(`../../img/icons8/${product.icon}`)}
                className="product-icon"
              />
              <h4 className="cart-headline-bold">{product.name}</h4>
            </div>
            <img
              className="closeBTN"
              src={Close}
              alt=""
              onClick={() => navigate(-1)}
            />
          </header>
          <form action="">
            <label>Quantity</label>
            <input type="number" placeholder="1" />
            <label>Weight</label>
            <input type="number" placeholder="100KG" />
            <label>Production type</label>
            <select>
              <option selected="selected">ECO</option>
              <option>Locally produced</option>
            </select>
            <label>Climate impact</label>
            <select>
              <option selected="selected">A</option>
              <option>B</option>
              <option>C</option>
            </select>
            <label>Note</label>
            <textarea placeholder="Note"></textarea>
            <input type="submit" value="Add to Fridge" />
          </form>
          <footer></footer>
        </article>
      )}
    </div>
  );
};

export default Product;
