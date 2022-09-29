import { useParams } from "react-router-dom";

const RecipeSearch = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default RecipeSearch;
