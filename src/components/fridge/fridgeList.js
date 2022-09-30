import { Link } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
import PecipeIcon from "../../img/recipe.png";
const FridgeList = () => {
  const { data: fridgeData } = useFatch("http://localhost:8000/fridge");
  console.log(fridgeData);
  return (
    <>
      {fridgeData &&
        fridgeData.map((item) => (
          <div className="FridgeItem">
            {item.product_type.map((product) => (
              <>
                <Link
                  to={`/recipe/${product.id}`}
                  key={product.id}
                  className="product-cart-small"
                >
                  <div className="flex-center">
                    <img
                      src={require(`../../img/icons8/${product.icon}`)}
                      className="product-icon"
                    />
                    <h4 className="cart-headline-bold">{product.name}</h4>
                  </div>
                  <div className="flex-center">
                    <span className="expiration-date">1 day</span>
                    <img
                      src={PecipeIcon}
                      className="recipeBTN"
                      alt="recipe icon"
                    />
                  </div>
                </Link>
              </>
            ))}
          </div>
        ))}
    </>
  );
};

export default FridgeList;
