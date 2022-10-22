import { Link } from "react-router-dom";
import PecipeIcon from "../img/recipe.png";
import Delete from "../img/close.png";
import useFatch from "./customHooks/useFetch";
import { useState } from "react";
import Fridge from "../img/fridge.png";
const ItemList = (props) => {
  const { data } = useFatch("/fridge");
  const url = props.url;
  console.log(url);
  const deleteItem = (id) => {
    console.log(id);
    fetch(`/fridge/${id}`, {
      method: "DELETE",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) =>
        setTimeout(() => {
          window.location.reload(false);
        }, 500)
      )
      .catch((error) => console.log("error", error));
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
      {data &&
        data.map((item) => (
          <div
            className="item-cart"
            key={item._id}
            onClick={() => displayMore(item._id)}
          >
            <div className="small-cart">
              <header>
                <h4>{item.Name}</h4>
                <div>
                  {url === "fridge" && (
                    <>
                      <span className="expiration-date">
                        {item.Expiration_date + " dagar"}
                      </span>
                      <Link to={`/recipe/${item._id}`}>
                        <img
                          src={PecipeIcon}
                          className="recipe-btn"
                          alt="recipe icon"
                        />
                      </Link>
                    </>
                  )}
                  {url === "list" && (
                    <img
                      src={Fridge}
                      onClick={() => addItemToFridge(item)}
                      alt=""
                    />
                  )}
                  <img
                    src={Delete}
                    onClick={() => deleteItem(item._id)}
                    alt=""
                  />
                </div>
              </header>
              {more === item._id && (
                <div className="more">
                  <div>
                    <label>Antal</label>
                    <input type="numner" placeholder={item.Quantity + "st"} />
                    <p></p>
                  </div>
                  <div>
                    <label>Vikt</label>
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
                    <button>Lägg till kylskåp</button>
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
