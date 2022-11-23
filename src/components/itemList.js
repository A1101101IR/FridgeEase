import { Link, useParams } from "react-router-dom";
import Close from "../img/close.png";
import { useEffect, useState } from "react";
import Success from "../img/success.png";
import MoreIcon from "../img/more.png";

/* itemlist är en multifunktionell komponenet som visar olika item */
/* varje item innehåller vis funtion beroende på vilken sida de är i */

const ItemList = (props) => {
  const url = props.url;
  const [notfication, setNotfication] = useState(false);
  const [msg, setMsg] = useState();
  const [data, setData] = useState();
  const [more, setMore] = useState(null);
  const [isMore, setIsMore] = useState(false);
  const { id } = useParams();

  /* hämtar data från olika källor beroende på url */
  async function getItems() {
    const res = await fetch(`/${url}`);
    const result = await res.json();
    setData(result);
  }

  /* tar bort items vid klick */
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

  /* lägger till item från shoppinglist till fridge */
  const addItemToFridge = async (item) => {
    /* När user lägger till en produkt till fridge konverterar tiden (se nästa kommentar) till en string */
    const date = new Date();
    Date.prototype.addDays = function (days) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };

    /* hämtar information om hur länge just den product håller beroende på productType */
    const response = await fetch(`/type?name=${item.Category}`);
    const time = await response.json();

    /* skickar post req till server och visar notfication på det vid 200 status */
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
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
    /* tar bort item från listan då den är i fridge nu */
    const res = await fetch(`/${url}/${item._id}`, {
      method: "DELETE",
      redirect: "follow",
    });
    const result = await res.json();
    if (res.status === 200) {
      getItems();
    }
    setTimeout(() => {
      setNotfication(false);
    }, 2000);
  };

  /* visar mer info om en item när användare klickar på ...icon */
  const displayMore = (id) => {
    if (!isMore) {
      setMore(id);
      setIsMore(true);
    } else {
      setMore(null);
      setIsMore(false);
    }
  };

  /* ränkar ut produktens ca utgångs datum  */
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
                  <h4>{item.Weight + " " + item.Quantity + " " + item.Name}</h4>
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
                    <button className="red" onClick={() => deleteItem(item)}>
                      Ta bort
                    </button>
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
