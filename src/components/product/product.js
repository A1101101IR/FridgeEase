import { useParams, useNavigate } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
import Plus from "../../img/plus.png";
import Close from "../../img/close.png";
import { useState } from "react";
const Product = () => {
  const { id } = useParams();
  const { data: product } = useFatch(`http://localhost:8000/products/${id}`);
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [quantity, setQuantity] = useState();
  const [weight, setWeight] = useState();
  const addItem = (name) => {
    setName(name);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      Name: name,
      Quantity: quantity,
      Weight: weight,
      Category: "mjölk",
      Expiration_date: 5,
      Notes: "Note",
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("http://localhost:3000/fridge", requestOptions)
      .then((response) => response.json())
      .then((result) => navigate("/"))
      .catch((error) => console.log("error", error));
  };
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
          <div className="form">
            <label>Quantity</label>
            <input
              type="number"
              placeholder="1"
              onChange={(e) => setQuantity(e.target.value)}
            />
            <label>Weight</label>
            <input
              type="number"
              placeholder="100KG"
              onChange={(e) => setWeight(e.target.value)}
            />
            {/* <label>Production type</label>
            <select>
              <option selected="selected">ECO</option>
              <option>Locally produced</option>
            </select>
            <label>Climate impact</label>
            <select>
              <option selected="selected">A</option>
              <option>B</option>
              <option>C</option>
            </select> */}
            <label>Note</label>
            <textarea placeholder="Note"></textarea>
            <input
              type="submit"
              onClick={(e) => addItem(product.name)}
              value="Add to Fridge"
            />
          </div>
          <footer></footer>
        </article>
      )}
    </div>
  );
};

export default Product;
