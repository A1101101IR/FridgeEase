import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
/* import useFatch from "../customHooks/useFetch";
import Favorite from "../../img/favorite.png"; */
import loadingImg from "../../img/loading.png";
import Rating from "../../img/rating.png";
import Time from "../../img/time.png";
import User from "../../img/user.png";
const RecipeSearch = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchResult, setSearchResult] = useState();
  /* const [productName, setProductName] = useState(id); */
  /* Just nu det är fast url för att fetcha data fixa senare */
  /* const fetchData = async (url) => {
    const res = await fetch(url);
    const result = await res.json();
    setProductName(result.Name);
  }; */
  console.log(id);
  useEffect(() => {
    /* fetchData("/shoppinglist/634d4af714a6d36c1ef974af"); */
    if (id) {
      fetch(`/recipe/byname/?phrase=${id}`)
        .then((res) => res.json())
        .then((results) => {
          setSearchResult(results.Recipes);
          setIsLoading(false);
          setError(null);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.message);
        });
    }
  }, [id]);

  return (
    <section className="recipe-container">
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
              {searchResult &&
                searchResult.map((item) => (
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
    </section>
  );
};

export default RecipeSearch;
