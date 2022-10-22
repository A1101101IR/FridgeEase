import useFatch from "../customHooks/useFetch";
import Plus from "../../img/plus.png";
import { Link, useParams } from "react-router-dom";
const ProductList = (props) => {
  const { data: productTypes } = useFatch("/type");
  const { id } = useParams();
  const url = props.url;

  console.log(url);
  return (
    <section className="product-list">
      {productTypes &&
        productTypes.map((type) => (
          <Link
            to={`/${url}/${type.Name}`}
            key={type._id}
            className="product-cart-small"
          >
            <img
              src={require(`../../img/icons8/${type.Name}.png`)}
              className="product-icon"
            />
            <h4 className="cart-headline-bold">{type.Name}</h4>
            <img src={Plus} className="plusBTN" alt="" />
          </Link>
        ))}
    </section>
  );
};

export default ProductList;
