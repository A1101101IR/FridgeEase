import { useParams, useNavigate } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
import Plus from "../../img/plus.png";
import Close from "../../img/close.png";
import { useState } from "react";
const AddToShoppingList = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [quantity, setQuantity] = useState();
  const [weight, setWeight] = useState();
  const addItem = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      Name: name,
      Quantity: quantity,
      Weight: weight,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("/shoppinglist", requestOptions)
      .then((response) => response.json())
      .then((result) =>
        setTimeout(() => {
          navigate(-1);
        }, 1000)
      )
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="product-cart-container">
      <article className="product-cart">
        <header>
          <div className="flex-center">
            {/* <img
              src={require(`../../img/icons8/${product.icon}`)}
              className="product-icon"
            /> */}
            <h4 className="cart-headline-bold">Lägg till</h4>
          </div>
          <img
            className="closeBTN"
            src={Close}
            alt=""
            onClick={() => navigate(-1)}
          />
        </header>
        <div className="form">
          <label>Name</label>
          <input
            type="text"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
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
          <label>Note</label>
          <textarea placeholder="Note"></textarea>
          <input
            type="submit"
            onClick={(e) => addItem()}
            value="Lägg till inköpslista"
          />
        </div>
        <footer></footer>
      </article>
    </div>
  );
};

export default AddToShoppingList;
