import { Link } from "react-router-dom";
import Plus from "../img/plus.png";
import useFatch from "./customHooks/useFetch";
import FridgeList from "./fridge/fridgeList";
const Fridge = () => {
  return (
    <section className="fridge">
      <Link to="/tofridge" className="fakeBTN">
        <h4>Lägg till vara</h4>
        <img src={Plus} className="plusBTN" alt="" />
      </Link>
      <FridgeList />
    </section>
  );
};

export default Fridge;
