import { Link } from "react-router-dom";
import Plus from "../img/plus.png";
const Fridge = () => {
  return (
    <>
      <section className="fridge">
        <Link to="/productlist" className="fakeBTN">
          <h4>Add Products</h4>
          <img src={Plus} alt="" />
        </Link>
        <p>Your fridge is empty! add products!</p>
      </section>
    </>
  );
};

export default Fridge;
