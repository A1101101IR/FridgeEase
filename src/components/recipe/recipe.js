import { Link, useParams } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
import loadingImg from "../../img/loading.png";
import Rating from "../../img/rating.png";
import Time from "../../img/time.png";
import User from "../../img/user.png";
import { useEffect, useState } from "react";

/* visar random recipe när user öppnar recipe sidan. */
/* fetchar info om ord som skrivs i sökfält */

const Recipe = () => {
  const [searchWord, setSearchWord] = useState(null);
  const {
    data: randomRecipe,
    isLoading,
    error,
  } = useFatch("recipe/random?numberofrecipes=8");
  const [recipeData, setRecipeData] = useState(randomRecipe);

  useEffect(() => {
    fetch(`/recipe/byname/?phrase=${searchWord}`)
      .then((res) => res.json())
      .then((results) => {
        setRecipeData(results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchWord]);

  return (
    <section>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for recipe"
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </div>
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
              {recipeData &&
                recipeData.Recipes.map((item) => (
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
                      <h4 className="on-res cart-headline-bold">
                        {item.Title}
                      </h4>
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
                          <pre>{item.Portions}4</pre>
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
    </section>
  );
};

export default Recipe;
