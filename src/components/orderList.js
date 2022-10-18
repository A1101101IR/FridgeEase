import { Link } from "react-router-dom";
import useFatch from "../components/customHooks/useFetch";
import loadingImg from "../img/loading.png";
import Plus from "../img/plus.png";
const OrderList = () => {
  const { data: shoppingList, isLoading, error } = useFatch("/shoppinglist");
  return (
    <div className="shopping-list-container">
      {isLoading && (
        <div className="loading-box">
          <img src={loadingImg} className="loading" />
          <h4>Loading...</h4>
        </div>
      )}
      {error && <h4>obs...</h4>}
      <Link to="/" className="fakeBTN">
        <h4>Lägg till vara</h4>
        <img src={Plus} className="plusBTN" alt="" />
      </Link>
      {shoppingList &&
        shoppingList.map((item) => (
          <div className="item-cart" key={item._id}>
            <h4>{item.Name}</h4>
            <p>{item.Quantity + "ST"}</p>
            <p>{item.Weight + "KG"}</p>
          </div>
        ))}
    </div>
  );
};

export default OrderList;
