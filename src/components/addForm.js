import { useParams, useNavigate } from "react-router-dom";
import Close from "../img/close.png";
import { useEffect, useState } from "react";
import Success from "../img/success.png";
import ErrorIcon from "../img/error.png";
import useFatch from "./customHooks/useFetch";

/* addForm är en multifunktionell komponenet som används för två olika ändamål */
/* 1 lägga till item till shoppinglist, 2 lägga till item till fridge  */

const AddForm = (props) => {
  const navigate = useNavigate();
  const url = props.url;
  const order = props.order;
  const { id } = useParams();
  const [itemData, setItemData] = useState();
  const [name, setName] = useState();
  const [quantity, setQuantity] = useState();
  const [weight, setWeight] = useState();
  const [notfication, setNotfication] = useState(false);
  const [msg, setMsg] = useState();
  const [msgImg, setMsgImg] = useState();
  const { data: itemTime } = useFatch(`/typeee?name=${id}`);

  /* funktion för att lägga till item till shoppinglist eller fridge */
  async function addItem() {
    /* kommer att jobba med bättre error :) */
    if (!name) {
      console.log("obs");
    }
    if (!quantity) {
      console.log("obs");
    }
    if (!weight) {
      console.log("obs");
    }

    /* lägger till ett (ca antal dagar) som ett product håller! */
    const date = new Date();
    Date.prototype.addDays = function (days) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };

    /*  */
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    if (url === "list") {
      var raw = JSON.stringify({
        Name: name,
        Quantity: quantity,
        Weight: weight,
        Category: id,
      });
    }
    if (url === "fridge") {
      var raw = JSON.stringify({
        Name: name,
        Quantity: quantity,
        Weight: weight,
        Category: id,
        Expiration_date: date.addDays(itemTime),
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
      setMsg(`${result.Name} lades till ${url}!`);
      setMsgImg(Success);
      setNotfication(true);
      setName(null);
      setWeight(null);
      setQuantity(null);
      setTimeout(() => {
        setNotfication(false);
        if (url === "fridge") {
          navigate("/");
        }
        if (url === "list") {
          navigate("/list");
        }
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

  /* funktion för att hämta info om produkt när användare vill ändra en produkt */
  async function getItem() {
    const res = await fetch(`/${url}/${id}`);
    const data = await res.json();
    setItemData(data);
    setName(data.Name);
    setQuantity(data.Quantity);
    setWeight(data.Weight);
  }

  /* funktion för att ändra information om en produkt */
  async function editItem(id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      Name: name,
      Quantity: quantity,
      Weight: weight,
    });
    const res = await fetch(`/${url}/${id}`, {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    });
    const data = await res.json();

    /* om det ändringen lyckas får user en notfication om det! */
    if (data.modifiedCount === 1) {
      setMsg(`${name} updaterades!`);
      setMsgImg(Success);
      setNotfication(true);
      setTimeout(() => {
        setNotfication(false);
        if (url === "list") {
          navigate(-1);
        }
        if (url === "fridge") {
          navigate("/");
        }
      }, 3000);
    }
  }

  useEffect(() => {
    getItem();
  }, []);
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
                {order === "edit" && (
                  <h4 className="cart-headline-bold">Ändra</h4>
                )}
                {!order && (
                  <>
                    <img
                      src={require(`../img/icons8/${id}.png`)}
                      className="product-icon"
                    />
                    <h4 className="cart-headline-bold">Lägg till {id}</h4>
                  </>
                )}
              </div>
              <img
                className="closeBTN"
                src={Close}
                alt=""
                onClick={() => navigate(-1)}
              />
            </header>
            {!order && (
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
                <select
                  placeholder="Enhet"
                  onChange={(e) => {
                    const enhet = e.target.value;
                    setQuantity(enhet);
                  }}
                >
                  <option>Välj enhet</option>
                  <option value="st">St</option>
                  <option value="kg">Kilo</option>
                  <option value="gram">Gram</option>
                  <option value="paket">Paket</option>
                  <option value="liter">Liter</option>
                </select>
                <label>Note</label>
                <textarea placeholder="Note"></textarea>
                <input
                  type="submit"
                  onClick={() => addItem()}
                  value="Lägg till inköpslista"
                />
              </div>
            )}
            {order === "edit" && (
              <>
                {itemData && (
                  <div className="form">
                    <label>Namn</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label>Mängd</label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                    <label>Enhet</label>
                    <select
                      value={quantity}
                      onChange={(e) => {
                        const enhet = e.target.value;
                        setQuantity(enhet);
                      }}
                    >
                      <option>Välj enhet</option>
                      <option value="st">St</option>
                      <option value="kg">Kilo</option>
                      <option value="gram">Gram</option>
                      <option value="paket">Paket</option>
                      <option value="liter">Liter</option>
                    </select>
                    <label>Note</label>
                    <textarea placeholder="Note"></textarea>
                    <input
                      type="submit"
                      onClick={() => editItem(itemData._id)}
                      value="Spara"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AddForm;
