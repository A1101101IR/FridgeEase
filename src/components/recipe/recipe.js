import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
import Favorite from "../../img/favorite.png";
import loadingImg from "../../img/loading.png";
const Recipe = () => {
  /* Fetch Recipe data and display out */
  const {
    data: searchResult,
    isLoading,
    error,
  } = useFatch("random?numberofrecipes=5");
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
                searchResult.Recipes.map((item) => (
                  <Link
                    to={`/recipeDetails/${item.Id}`}
                    className="recipe-cart-small"
                    key={item.Id}
                  >
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
                      <img src={item.ImageUrl} width={300} alt="" />
                      <div className="recipe-detail"></div>
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
