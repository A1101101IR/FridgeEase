import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFatch from "../customHooks/useFetch";
import loadingImg from "../../img/loading.png";
const RecipeDetails = () => {
  const { id } = useParams();
  const {
    data: searchResult,
    isLoading,
    error,
  } = useFatch(`/recipedetails/${id}`);
  /* const [searchResult, setSearchResult] = useState(true); */
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
                      Att saffran passar bra ihop med fisk är sen gammalt. Här
                      är den gyllene kryddan i crème fraichen som breds över
                      fisken innan den tillagas i ugnen. Ät ihop med ett
                      fluffigt mos, hemmagjort såklart, och en syrlig sallad.
                    </p>
                  </div>
                </article>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default RecipeDetails;
