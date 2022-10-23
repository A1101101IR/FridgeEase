import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <Link to="/" className="logo link">
        FoodBud
      </Link>
      <div className="btn-box">
        <button onClick={() => navigate(-1)}>tillbaka</button>
      </div>
    </div>
  );
};

export default Header;
