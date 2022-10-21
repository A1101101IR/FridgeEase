import { Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation";
import ShoppingList from "./components/shopping/shoppingList";
import Account from "./components/account";
import Recipe from "./components/recipe/recipe";
import Fridge from "./components/fridge";
import Header from "./components/header";
import ProductList from "./components/product/product-list";
import Product from "./components/product/product";
import RecipeSearch from "./components/recipe/recipeSearch";
import RecipeDetails from "./components/recipe/RecipeDetails";
import AddToShoppingList from "./components/shopping/addToShoppingList";
function App() {
  return (
    <div className="container">
      <section className="main">
        <Header />
        <Routes>
          {/* <Route path="/" element={<Main />}></Route> */}
          <Route path="/" element={<Fridge />}></Route>
          <Route path="/productlist" element={<ProductList />}></Route>
          <Route path="/productlist/:id" element={<Product />}></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/shoppingList" element={<ShoppingList />}></Route>
          <Route
            path="/addtoshoppinglist"
            element={<AddToShoppingList />}
          ></Route>
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
