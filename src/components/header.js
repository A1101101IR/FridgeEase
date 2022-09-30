import { Link } from "react-router-dom";

const Header = () => {
  return (
    <section className="header">
      {/* <h1 className="logo">FoodBud</h1> */}
      <Link to="/" className="logo link">
        FoodBud
      </Link>
    </section>
  );
};

export default Header;
