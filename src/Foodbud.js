import { Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation";
import ShoppingList from "./components/shoppingList";
import Account from "./components/account";
import Recipe from "./components/recipe/recipe";
import Fridge from "./components/fridge";
import Header from "./components/header";
import ProductList from "./components/product/product-list";
import RecipeSearch from "./components/recipe/recipeSearch";
import RecipeDetails from "./components/recipe/RecipeDetails";
import AddForm from "./components/addForm";
import Login from "./components/login";
function Foodbud() {
  const user = localStorage.getItem("user");
  return (
    <div className="container">
      {user && (
        <>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Fridge />}></Route>
              <Route
                path="/tofridge"
                element={<ProductList url={"tofridge"} />}
              ></Route>
              <Route
                path="/tofridge/:id"
                element={<AddForm url={"fridge"} />}
              ></Route>
              <Route
                path="/fridge/:id"
                element={<AddForm order={"edit"} url={"fridge"} />}
              ></Route>

              <Route path="/account" element={<Account />}></Route>
              <Route path="/list" element={<ShoppingList />}></Route>

              <Route
                path="/tolist"
                element={<ProductList url={"tolist"} />}
              ></Route>

              <Route
                path="/list/:id"
                element={<AddForm order={"edit"} url={"list"} />}
              ></Route>
              <Route
                path="/tolist/:id"
                element={<AddForm url={"list"} />}
              ></Route>

              <Route path="/recipe" element={<Recipe />}></Route>
              <Route path="/recipe/:id" element={<RecipeSearch />}></Route>
              <Route
                path="/recipeDetails/:id"
                element={<RecipeDetails />}
              ></Route>
            </Routes>
          </main>
          <Navigation />
        </>
      )}
      {!user && (
        <div className="welcome-page">
          <Login />
        </div>
      )}
    </div>
  );
}

export default Foodbud;
