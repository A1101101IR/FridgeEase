import { Link } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
import loadingImg from "../../img/loading.png";
import Rating from "../../img/rating.png";
import Time from "../../img/time.png";
import User from "../../img/user.png";
const Recipe = () => {
  const {
    data: randomRecipe,
    isLoading,
    error,
  } = useFatch("recipe/random?numberofrecipes=5");
  return (
    <div className="recipe-container">
      {isLoading && (
        <div className="loading-box">
          <img src={loadingImg} className="loading" />
          <h4>Loading...</h4>
        </div>
      )}
      {error && <h4>obs...</h4>}
      {!isLoading && (
        <>
          {!error && (
            <>
              {randomRecipe &&
                randomRecipe.Recipes.map((item) => (
                  <Link
                    to={`/recipeDetails/${item.Id}`}
                    className="recipe-cart-small"
                    key={item.Id}
                  >
                    <img src={item.ImageUrl} className="recipe-img" alt="" />
                    <header>
                      <h4 className="cart-headline-bold">{item.Title}</h4>
                    </header>
                    <div className="recipe-cart-body">
                      <div className="rating-time-portions">
                        <span className="rating">
                          <img src={Rating} alt="rating icon" />
                          <pre>{item.AverageRating}</pre>
                        </span>
                        <span className="time">
                          <img src={Time} alt="timer icon" />
                          <pre>{item.CookingTimeAbbreviated}</pre>
                        </span>
                        <span className="portions">
                          <img src={User} alt="user icon" />
                          <pre>{item.Portions}</pre>
                        </span>
                      </div>
                      <p>{item.PreambleHTML}</p>
                    </div>
                  </Link>
                ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Recipe;
