import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
import Recipe from "../recipe";
import Favorite from "../../img/favorite.png";

const RecipeSearch = () => {
  const { id } = useParams();
  const [searchResult, setSearchResult] = useState();
  const { data: productData } = useFatch(
    `http://localhost:8000/products/${id}`
  );

  const searchWord = "bacon";
  useEffect(() => {
    fetch(
      `https://edamam-recipe-search.p.rapidapi.com/search?q=${searchWord}`,
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
    /* const searchWord = "bacon";
    fetch(
      `https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes&q=${searchWord}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "fc6f5f41bfmshb50a75999c65417p13ac81jsn45483f53f901",
          "X-RapidAPI-Host": "tasty.p.rapidapi.com",
        },
      }
    )
      .then((res) => res.json())
      .then((results) => console.log(results)); */
  }, []);
  return (
    <div className="recipe-container">
      {searchResult &&
        searchResult.map((item) => (
          <article className="recipe-cart-small">
            <header>
              <div className="flex-center">
                <img
                  src={require(`../../img/icons8/${productData.icon}`)}
                  className="product-icon"
                />
                <h4 className="cart-headline-bold">{item.recipe.label}</h4>
              </div>
              <div className="flex-center">
                <img className="favoriteBTN" src={Favorite} />
              </div>
            </header>
            <div className="recipe-cart-body">
              <div className="fakeIMG"></div>
              <div className="info1"></div>
              <div className="info2"></div>
            </div>
          </article>
        ))}
    </div>
  );
};

export default RecipeSearch;
