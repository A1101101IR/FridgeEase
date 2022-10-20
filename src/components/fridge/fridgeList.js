import { Link } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
import PecipeIcon from "../../img/recipe.png";
const FridgeList = () => {
  const { data: fridgeData } = useFatch("/fridge");
  console.log(fridgeData);
  return (
    <>
      {fridgeData &&
        fridgeData.map((item) => (
          <div className="FridgeItem" key={item.id}>
            <Link
              to={`/recipe/${item._id}`}
              key={item.id}
              className="product-cart-small"
            >
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
                <img src={PecipeIcon} className="recipeBTN" alt="recipe icon" />
              </div>
            </Link>
          </div>
        ))}
    </>
  );
};

export default FridgeList;
