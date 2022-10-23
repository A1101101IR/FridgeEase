import { Link } from "react-router-dom";
import PecipeIcon from "../img/recipe.png";
import Close from "../img/close.png";
import useFatch from "./customHooks/useFetch";
import { useState } from "react";
import Fridge from "../img/fridge.png";
const ItemList = (props) => {
  const url = props.url;

  const { data } = useFatch(`/${url}`);

  const deleteItem = (id) => {
    fetch(`/${url}/${id}`, {
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
                <div className="right-box">
                  {url === "fridge" && (
                    <span className="expiration-date">
                      {item.Expiration_date + " dagar"}
                    </span>
                  )}
                  {more !== item._id && (
                    <>
                      {url === "fridge" && (
                        <Link to={`/recipe/${item._id}`}>
                          <img
                            src={PecipeIcon}
                            className="recipe-btn"
                            alt="recipe icon"
                          />
                        </Link>
                      )}
                      {url === "list" && (
                        <img
                          src={Fridge}
                          onClick={() => addItemToFridge(item)}
                          alt=""
                        />
                      )}
                    </>
                  )}
                  {isMore && (
                    <>
                      {more === item._id && (
                        <img
                          src={Close}
                          onClick={() => setIsMore(false)}
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
                    <button onClick={() => deleteItem(item._id)}>
                      Ta bort
                    </button>
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
