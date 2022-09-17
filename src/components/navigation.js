import { Link, useNavigate } from "react-router-dom";
const Navigation = () => {
  return (
    <section className="navbar">
      <nav>
        <Link to="/recipe" className="link">
          Recipe
        </Link>
        <Link to="/orderList" className="link">
          Order List
        </Link>
        <Link to="/fridge" className="link">
          Fridge
        </Link>
        <Link to="/account" className="link">
          Account
        </Link>
      </nav>
    </section>
  );
};

export default Navigation;
