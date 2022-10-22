import { Link } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
import PecipeIcon from "../../img/recipe.png";
import Delete from "../../img/close.png";
const FridgeList = () => {
  const { data: fridgeData } = useFatch("/fridge");
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
  return (
    <>
      {fridgeData &&
        fridgeData.map((item) => (
          <div className="FridgeItem" key={item._id}>
            <div key={item.id} className="product-cart-small">
              <div className="flex-center">
                {/* <img
                  src={require(`../../img/icons8/${product.icon}`)}
                  className="product-icon"
                /> */}
                <h4 className="cart-headline-bold">{item.Name}</h4>
              </div>
              <div className="flex-center">
                <span className="expiration-date">
                  {item.Expiration_date + " dagar"}
                </span>
                <div className="icon-box">
                  <Link to={`/recipe/${item._id}`}>
                    <img
                      src={PecipeIcon}
                      className="recipe-btn"
                      alt="recipe icon"
                    />
                  </Link>
                  <img
                    src={Delete}
                    onClick={() => deleteItem(item._id)}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default FridgeList;
