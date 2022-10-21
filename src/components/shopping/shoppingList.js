import { Link } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
import loadingImg from "../../img/loading.png";
import Plus from "../../img/plus.png";
import Fridge from "../../img/fridge.png";
import Delete from "../../img/close.png";
const ShoppingList = () => {
  const { data: shoppingList, isLoading, error } = useFatch("/shoppinglist");
  const getItems = () => {};
  const deleteItem = (id) => {
    fetch(`http://localhost:3000/shoppinglist/${id}`, {
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
    console.log(item);
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

    fetch("http://localhost:3000/fridge", {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="shopping-list-container">
      <Link to="/addtoshoppinglist" className="fakeBTN">
        <h4>Lägg till inköpslista</h4>
        <img src={Plus} className="plusBTN" alt="" />
      </Link>
      {isLoading && (
        <div className="loading-box">
          <img src={loadingImg} className="loading" />
          <h4>Loading...</h4>
        </div>
      )}
      {error && <h4>obs...</h4>}
      {shoppingList &&
        shoppingList.map((item) => (
          <div className="item-cart" key={item._id}>
            <h4>{item.Name}</h4>
            <div>
              <img src={Fridge} onClick={() => addItemToFridge(item)} alt="" />
              <img src={Delete} onClick={() => deleteItem(item._id)} alt="" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default ShoppingList;
