import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
import loadingImg from "../../img/loading.png";
import Rating from "../../img/rating.png";
import Time from "../../img/time.png";
import User from "../../img/user.png";
const RecipeDetails = () => {
  const { id } = useParams();
  const { data: recipe, isLoading, error } = useFatch(`/recipe/details/${id}`);

  return (
    <>
      {isLoading && (
        <div className="loading-box">
          <img src={loadingImg} className="loading" />
          <h4>Loading...</h4>
        </div>
      )}
      {error && <h4>obs...</h4>}
      {recipe && (
        <article className="recipe-details-page">
          <header>
            <div></div>
            <img src={recipe.ImageUrl} className="recipe-img-box" alt="" />
            <h4 className="cart-headline-bold">{recipe.Title}</h4>
            <p className="short-info">{recipe.PreambleHTML}</p>
          </header>
          <div className="recipe-details-body">
            <div className="rating-time-portions">
              <span className="rating">
                <img src={Rating} alt="rating icon" />
                <pre>{recipe.AverageRating}</pre>
              </span>
              <span className="time">
                <img src={Time} alt="timer icon" />
                <pre>{recipe.CookingTimeAbbreviated}</pre>
              </span>
              <span className="portions">
                <img src={User} alt="user icon" />
                <pre>{recipe.Portions}</pre>
              </span>
            </div>
            {recipe.IngredientGroups.map((Item) => (
              <div className="ingredients" key={recipe.Id}>
                <h4>{Item.GroupName && Item.GroupName}</h4>
                <p className="portion-info">
                  <span>Ingredienser</span> för {Item.Portions} personer
                </p>
                <form>
                  {Item.Ingredients.map((Ingredient) => (
                    <div className="ingredient">
                      <input type="checkbox" />
                      <label>{Ingredient.Text}</label>
                    </div>
                  ))}
                  <button>Lagg till inköplista</button>
                </form>
              </div>
            ))}
            <div className="cooking-steps">
              <form>
                {recipe.CookingStepsWithTimers.map((item) => (
                  <div className="step">
                    <input type="checkbox" />
                    <label>{item.Description}</label>
                  </div>
                ))}
              </form>
            </div>
          </div>
        </article>
      )}
    </>
  );
};

export default RecipeDetails;
