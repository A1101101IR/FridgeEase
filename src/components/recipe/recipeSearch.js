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
    data: productData,
    isLoading,
    error,
  } = useFatch(`http://localhost:8000/products/${id}`);

  useEffect(() => {
    if (!isLoading) {
      console.log(productData.name);
      const word = productData.name;
      fetch(`/recipebyname/?phrase=${word}`)
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
                    <header>
                      <div className="flex-center">
                        <img
                          src={require(`../../img/icons8/${productData.icon}`)}
                          className="product-icon"
                        />
                        <h4 className="cart-headline-bold">{item.Title}</h4>
                      </div>
                      <div className="flex-center">
                        <img className="favoriteBTN" src={Favorite} />
                      </div>
                    </header>
                    <div className="recipe-cart-body">
                      {/* <div className="meal-dish-type">
                        <span>{item.recipe.mealType}</span>
                        <span>{item.recipe.dishType}</span>
                      </div> */}
                      <p>{item.PreambleHTML}</p>
                      <img src={item.ImageUrl} width={300} alt="" />
                      <div className="recipe-detail">
                        {/* <ul>
                          {item.recipe.ingredients.map((ingredient) => (
                            <li>{ingredient.text}</li>
                          ))}
                        </ul> */}
                      </div>
                    </div>
                  </Link>
                ))}
              {/* {searchResult &&
                searchResult.map((item) => (
                  <article className="recipe-cart-small" key={item.Id}>
                    <header>
                      <div className="flex-center">
                        <img
                          src={require(`../../img/icons8/${productData.icon}`)}
                          className="product-icon"
                        />
                        <h4 className="cart-headline-bold">{item.Title}</h4>
                      </div>
                      <div className="flex-center">
                        <img className="favoriteBTN" src={Favorite} />
                      </div>
                    </header>
                    <div className="recipe-cart-body">
                      <div className="meal-dish-type">
                        <span>{item.recipe.mealType}</span>
                        <span>{item.recipe.dishType}</span>
                      </div>
                      <div className="recipe-detail">
                        <ul>
                          {item.recipe.ingredients.map((ingredient) => (
                            <li>{ingredient.text}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                ))} */}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default RecipeSearch;
