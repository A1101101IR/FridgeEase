import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
import Favorite from "../../img/favorite.png";
import loadingImg from "../../img/loading.png";
/* require("dotenv").config(); */
const RecipeSearch = () => {
  const { id } = useParams();
  const [searchResult, setSearchResult] = useState();
  const {
    data: product,
    isLoading,
    error,
  } = useFatch(`http://localhost:8000/products/${id}`);

  useEffect(() => {
    if (!isLoading) {
      const word = product.name;
      fetch(`/recipe/byname/?phrase=${word}`)
        .then((res) => res.json())
        .then((results) => setSearchResult(results.Recipes));
    }
  }, [isLoading]);
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
              {searchResult &&
                searchResult.map((item) => (
                  <Link
                    to={`/recipeDetails/${item.Id}`}
                    className="recipe-cart-small"
                    key={item.Id}
                  >
                    <img src={item.ImageUrl} className="recipe-img" alt="" />
                    <header>
                      <div className="flex-center">
                        <h4 className="cart-headline-bold">{item.Title}</h4>
                      </div>
                      <div className="flex-center">
                        <img className="favoriteBTN" src={Favorite} />
                      </div>
                    </header>
                    <div className="recipe-cart-body">
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

export default RecipeSearch;
