import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
import Favorite from "../../img/favorite.png";
import loadingImg from "../../img/loading.png";
const RecipeSearch = () => {
  const { id } = useParams();
  const [searchResult, setSearchResult] = useState();
  const {
    data: productData,
    isLoading,
    error,
  } = useFatch(`http://localhost:8000/products/${id}`);
  console.log(productData);

  useEffect(() => {
    if (!isLoading) {
      fetch(
        `https://edamam-recipe-search.p.rapidapi.com/search?q=${productData.name}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "fc6f5f41bfmshb50a75999c65417p13ac81jsn45483f53f901",
            "X-RapidAPI-Host": "edamam-recipe-search.p.rapidapi.com",
          },
        }
      )
        .then((res) => res.json())
        .then((results) => setSearchResult(results.hits));
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
                  <article className="recipe-cart-small" key={item.recipe.id}>
                    <header>
                      <div className="flex-center">
                        <img
                          src={require(`../../img/icons8/${productData.icon}`)}
                          className="product-icon"
                        />
                        <h4 className="cart-headline-bold">
                          {item.recipe.label}
                        </h4>
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
                ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default RecipeSearch;
