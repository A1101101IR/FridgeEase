import { Link } from "react-router-dom";
import Plus from "../img/plus.png";
import useFatch from "./customHooks/useFetch";
import FridgeList from "./fridge/fridgeList";
const Fridge = () => {
  const { data: fridgeData } = useFatch("http://localhost:8000/fridge");
  return (
    <>
      <section className="fridge">
        <Link to="/productlist" className="fakeBTN">
          <h4>Add Products</h4>
          <img src={Plus} alt="" />
        </Link>

        {!fridgeData && <p>Your fridge is empty! add products!</p>}
        {fridgeData && <FridgeList />}
      </section>
    </>
  );
};

export default Fridge;
