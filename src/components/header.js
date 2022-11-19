import { Link, useNavigate, useParams } from "react-router-dom";
import Tillbaka from "../img/back.png";
import Notification from "../img/notification.png";
const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="btn-box">
        {window.location.href != "http://localhost:3000/" && (
          <img src={Tillbaka} onClick={() => navigate(-1)} alt="" />
        )}
      </div>
      <Link to="/" className="logo link">
        FoodBud
      </Link>
      <div className="btn-box">
        <img src={Notification} onClick={() => navigate(-1)} alt="" />
      </div>
    </div>
  );
};

export default Header;
