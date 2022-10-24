import { Link } from "react-router-dom";
import PecipeIcon from "../img/recipe.png";
import Close from "../img/close.png";
import useFatch from "./customHooks/useFetch";
import { useState } from "react";
import Fridge from "../img/fridge.png";
import Success from "../img/success.png";
import MoreIcon from "../img/more.png";
const ItemList = (props) => {
  const url = props.url;
  const [notfication, setNotfication] = useState(false);
  const [msg, setMsg] = useState();
  const { data } = useFatch(`/${url}`);

  const deleteItem = (item) => {
    fetch(`/${url}/${item._id}`, {
      method: "DELETE",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    setMsg(`${item.Name} togs bort från listan!`);
    displayMore(item._id);
    setNotfication(true);
    setTimeout(() => {
      setNotfication(false);
      window.location.reload(false);
    }, 2000);
  };

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

  const [more, setMore] = useState(null);
  const [isMore, setIsMore] = useState(false);
  const displayMore = (id) => {
    if (!isMore) {
      setMore(id);
      setIsMore(true);
    } else {
      setMore(null);
      setIsMore(false);
    }
  };

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
                  <div>
                    <input type="numner" placeholder={item.Quantity + "st"} />
                    <p></p>
                  </div>
                  <div>
                    <input type="numner" placeholder={item.Weight + "kg"} />
                  </div>
                  <p className="note">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                  <div>
                    <button>Ändra</button>
                    <button onClick={() => deleteItem(item)}>Ta bort</button>
                    {url === "list" && (
                      <button onClick={() => addItemToFridge(item)}>
                        Lägg till kylskåp
                      </button>
                    )}
                    {url === "fridge" && <button>Hitta recept</button>}
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
