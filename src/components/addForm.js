import { useParams, useNavigate } from "react-router-dom";
import Close from "../img/close.png";
import { useState } from "react";
import Success from "../img/success.png";
import ErrorIcon from "../img/error.png";
const AddForm = (props) => {
  const navigate = useNavigate();
  const url = props.url;
  const { id } = useParams();
  const [name, setName] = useState();
  const [quantity, setQuantity] = useState();
  const [weight, setWeight] = useState();
  const [notfication, setNotfication] = useState(false);
  const [msg, setMsg] = useState();
  const [msgImg, setMsgImg] = useState();
  async function addItem() {
    if (!name) {
      console.log("obs");
    }
    if (!quantity) {
      console.log("obs");
    }
    if (!weight) {
      console.log("obs");
    }

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

    const res = await fetch(`/${url}`, requestOptions);
    const result = await res.json();
    console.log(result);
    if (res.status === 200) {
      setMsg(`${result.Name} lades till kylskåp!`);
      setMsgImg(Success);
      setNotfication(true);
      setName(null);
      setWeight(null);
      setQuantity(null);
      setTimeout(() => {
        setNotfication(false);
        navigate("/");
      }, 3000);
    }
    if (res.status === 400) {
      setMsg(`Du måste fylla samtliga fält!`);
      setMsgImg(ErrorIcon);
      setNotfication(true);
      setTimeout(() => {
        setNotfication(false);
      }, 1000);
    }
  }
  return (
    <section>
      <div className="addForm-body">
        {notfication && (
          <div className="alert-container">
            <div className="alert">
              <img src={msgImg} alt="" />
              <h4>{msg}</h4>
            </div>
          </div>
        )}
        {!notfication && (
          <div className="addForm">
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
              <label>Namn</label>
              <input
                type="text"
                placeholder="Namn"
                onChange={(e) => setName(e.target.value)}
              />
              <label>Mängd</label>
              <input
                type="number"
                placeholder="Mängd"
                onChange={(e) => setWeight(e.target.value)}
              />
              <label>Enhet</label>
              {/* <input
          type="number"
          placeholder="Enhet"
          onChange={(e) => setQuantity(e.target.value)}
        /> */}
              <select
                placeholder="Enhet"
                onChange={(e) => {
                  const enhet = e.target.value;
                  setQuantity(enhet);
                }}
              >
                <option value="kg">kg</option>
                <option value="st">st</option>
              </select>
              <label>Note</label>
              <textarea placeholder="Note"></textarea>
              <input
                type="submit"
                onClick={() => addItem()}
                value="Lägg till inköpslista"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AddForm;
