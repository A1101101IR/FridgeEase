import { Link, useNavigate } from "react-router-dom";
import Tillbaka from "../img/back.png";
import Notification from "../img/notification.png";
const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="btn-box">
        {window.location.href != "http://localhost:3000/" && (
          <img src={Tillbaka} onClick={() => navigate(-1)} alt="back icon" />
        )}
      </div>
      <Link to="/" className="logo link">
        FridgeEase
      </Link>
      <div className="btn-box">
        <img src={Notification} alt="nofitation icon" />
      </div>
    </div>
  );
};

export default Header;
