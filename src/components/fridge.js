import Plus from "../img/plus.png";
const Fridge = () => {
  return (
    <>
      <section className="fridge">
        <div className="fakeBTN">
          <h4>Add Products</h4>
          <img src={Plus} alt="" />
        </div>
        <p>Your fridge is empty! add products!</p>
      </section>
    </>
  );
};

export default Fridge;
