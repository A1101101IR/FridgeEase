import { Link, useNavigate } from "react-router-dom";
import Shopping from "../img/shopping.png";
import Account from "../img/account.png";
import Fridge from "../img/fridge.png";
import Recipe from "../img/recipe.png";
const Navigation = () => {
  return (
    <section className="navbar">
      <nav>
        <Link to="/orderList" className="link">
          <img src={Shopping} alt="" />
          Shopping
        </Link>
        <Link to="/recipe" className="link">
          <img src={Recipe} alt="" />
          Recipe
        </Link>
        <Link to="/fridge" className="link">
          <img src={Fridge} alt="" />
          Fridge
        </Link>
        <Link to="/account" className="link">
          <img src={Account} alt="" />
          Account
        </Link>
      </nav>
    </section>
  );
};

export default Navigation;
