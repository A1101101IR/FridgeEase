import { Link } from "react-router-dom";
import PecipeIcon from "../img/recipe.png";
import Close from "../img/close.png";
import useFatch from "./customHooks/useFetch";
import { useEffect, useState } from "react";
import Fridge from "../img/fridge.png";
import Success from "../img/success.png";
import Error from "../img/error.png";
import MoreIcon from "../img/more.png";
const ItemList = (props) => {
  const url = props.url;
  const [notfication, setNotfication] = useState(false);
  const [msg, setMsg] = useState();
  const [data, setData] = useState();
  const [more, setMore] = useState(null);
  const [isMore, setIsMore] = useState(false);

  async function getItems() {
    const res = await fetch(`/${url}`);
    const result = await res.json();
    setData(result);
  }

  async function deleteItem(item) {
    const res = await fetch(`/${url}/${item._id}`, {
      method: "DELETE",
      redirect: "follow",
    });
    const result = await res.json();
    if (res.status === 200) {
      getItems();
      setMsg(`${item.Name} togs bort från listan!`);
      displayMore(item._id);
      setNotfication(true);
      setTimeout(() => {
        setNotfication(false);
      }, 1000);
    }
  }

  const addItemToFridge = (item) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      Name: item.Name,
      Quantity: item.Quantity,
      Weight: item.Weight,
      Category: "mjölk",
      Expiration_date: 5,
      Notes: "Note",
    });
    fetch("/fridge", {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    setMsg(`${item.Name} lades till kylskåp!`);
    displayMore(item._id);
    setNotfication(true);
    setTimeout(() => {
      setNotfication(false);
    }, 2000);
  };

  const displayMore = (id) => {
    if (!isMore) {
      setMore(id);
      setIsMore(true);
    } else {
      setMore(null);
      setIsMore(false);
    }
  };

  useEffect(() => {
    getItems();
  }, []);
  return (
    <div className="item-container">
      {notfication && (
        <div className="alert-container">
          <div className="alert">
            <img src={Success} alt="" />
            <h4>{msg}</h4>
          </div>
        </div>
      )}
      {data &&
        data.map((item) => (
          <div className="item-cart" key={item._id}>
            <div className="small-cart">
              <header>
                <h4>{item.Name}</h4>
                <div className="right-box">
                  {url === "fridge" && (
                    <span className="expiration-date">
                      {item.Expiration_date + " dagar"}
                    </span>
                  )}
                  {more !== item._id && (
                    <>
                      <img
                        src={MoreIcon}
                        className="more-icon"
                        onClick={() => displayMore(item._id)}
                        alt=""
                      />
                    </>
                  )}
                  {isMore && (
                    <>
                      {more === item._id && (
                        <img
                          src={Close}
                          onClick={() => displayMore(item._id)}
                          alt=""
                        />
                      )}
                    </>
                  )}
                </div>
              </header>
              {more === item._id && (
                <div className="more">
                  <div className="input-body">
                    <div className="input-box">
                      <p>Mängd</p>
                      <input type="numner" placeholder={item.Weight} />
                    </div>
                    <div className="input-box select">
                      <p>Enhet</p>
                      <select>
                        <option>{item.Quantity}</option>
                      </select>
                    </div>
                  </div>
                  <p className="note">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                  <div className="btn-box">
                    <Link to={`/${url}/${item._id}`}>
                      <button>Ändra</button>
                    </Link>
                    <button onClick={() => deleteItem(item)}>Ta bort</button>
                    {url === "list" && (
                      <button onClick={() => addItemToFridge(item)}>
                        Lägg till kylskåp
                      </button>
                    )}
                    {url === "fridge" && (
                      <Link to={`/recipe/${item.Name}`}>
                        <button>Hitta recept</button>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ItemList;
