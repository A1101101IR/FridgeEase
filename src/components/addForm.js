import { useParams, useNavigate } from "react-router-dom";
import Close from "../img/close.png";
import { useState } from "react";
const AddForm = (props) => {
  const navigate = useNavigate();
  const url = props.url;
  const { id } = useParams();
  const [name, setName] = useState();
  const [quantity, setQuantity] = useState();
  const [weight, setWeight] = useState();
  const addItem = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    if (url === "list") {
      var raw = JSON.stringify({
        Name: name,
        Quantity: quantity,
        Weight: weight,
      });
    }

    if (url === "fridge") {
      var raw = JSON.stringify({
        Name: name,
        Quantity: quantity,
        Weight: weight,
        Category: "mjölk",
        Expiration_date: 5,
        Notes: "Note",
      });
    }

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`/${url}`, requestOptions)
      .then((response) => response.json())
      .then((result) =>
        setTimeout(() => {
          navigate(-1);
        }, 1000)
      )
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="addForm-body">
      <header>
        <div className="flex-center">
          <img
            src={require(`../img/icons8/${id}.png`)}
            className="product-icon"
          />
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
    </div>
  );
};

export default AddForm;
