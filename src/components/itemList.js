import { Link, useParams } from "react-router-dom";
import Close from "../img/close.png";
import { useEffect, useState } from "react";
import Success from "../img/success.png";
import MoreIcon from "../img/more.png";
import useFatch from "./customHooks/useFetch";
const ItemList = (props) => {
  const url = props.url;
  const [notfication, setNotfication] = useState(false);
  const [msg, setMsg] = useState();
  const [data, setData] = useState();
  const [more, setMore] = useState(null);
  const [isMore, setIsMore] = useState(false);
  const { id } = useParams();
  const [itemTime, setItemTime] = useState();

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

  const addItemToFridge = async (item) => {
    /* lägger till ett (ca antal dagar) som ett product håller! */
    const date = new Date();
    Date.prototype.addDays = function (days) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    /* hämtar information om hur länge just den product håller */
    const response = await fetch(`/time?name=${item.Category}`);
    const time = await response.json();
    /*  */

    var raw = JSON.stringify({
      Name: item.Name,
      Quantity: item.Quantity,
      Weight: item.Weight,
      Category: item.Category,
      Expiration_date: date.addDays(time),
      Notes: "Note",
    });

    fetch("/fridge", {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    })
      .then((response) => response.json())
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

  /* ränkar ut utgångs datum  */
  const CountExpirationDate = (expirationDate) => {
    let currentDate = new Date();
    let difference =
      new Date(expirationDate).getTime() - new Date(currentDate).getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
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
                      {CountExpirationDate(item.Expiration_date) + " dagar"}
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
