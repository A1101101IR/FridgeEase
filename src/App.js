import { Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation";
import ShoppingList from "./components/shopping/shoppingList";
import Account from "./components/account";
import Recipe from "./components/recipe/recipe";
import Fridge from "./components/fridge";
import Header from "./components/header";
import ProductList from "./components/product/product-list";
import RecipeSearch from "./components/recipe/recipeSearch";
import RecipeDetails from "./components/recipe/RecipeDetails";
import AddForm from "./components/addForm";
function App() {
  return (
    <div className="container">
      <section className="main">
        <Header />
        <Routes>
          {/* <Route path="/" element={<Main />}></Route> */}
          <Route path="/" element={<Fridge />}></Route>
          <Route
            path="/tofridge"
            element={<ProductList url={"tofridge"} />}
          ></Route>
          <Route
            path="/tofridge/:id"
            element={<AddForm url={"fridge"} />}
          ></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/list" element={<ShoppingList />}></Route>
          <Route
            path="/tolist"
            element={<ProductList url={"tolist"} />}
          ></Route>
          <Route path="/tolist/:id" element={<AddForm url={"list"} />}></Route>
          <Route path="/recipe" element={<Recipe />}></Route>
          <Route path="/recipe/:id" element={<RecipeSearch />}></Route>
          <Route path="/recipeDetails/:id" element={<RecipeDetails />}></Route>
        </Routes>
      </section>
      <Navigation />
    </div>
  );
}

export default App;
