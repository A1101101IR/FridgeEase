import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams();
  const [searchResult, setSearchResult] = useState(true);
  /* useEffect(() => {
    if (id) {
      console.log(id);
      fetch(`/recipedetails/${id}`)
        .then((res) => res.json())
        .then((results) => setSearchResult(results));
    }
  }, [id]); */
  return (
    <>
      {searchResult && (
        <article className="recipe-details-page">
          <header>
            <div className="recipe-img-box"></div>
            <h4 className="cart-headline-bold">
              Saffransbakad fisk med mos och citrongurka
            </h4>
          </header>
          <div className="recipe-details-body">
            <p className="short-info">
              Att saffran passar bra ihop med fisk är sen gammalt. Här är den
              gyllene kryddan i crème fraichen som breds över fisken innan den
              tillagas i ugnen. Ät ihop med ett fluffigt mos, hemmagjort
              såklart, och en syrlig sallad.
            </p>
          </div>
        </article>
      )}
    </>
  );
};

export default RecipeDetails;
