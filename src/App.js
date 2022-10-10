import { Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation";
import OrderList from "./components/orderList";
import Account from "./components/account";
import Recipe from "./components/recipe";
import Fridge from "./components/fridge";
import Header from "./components/header";
import Main from "./main";
import ProductList from "./components/product/product-list";
import Product from "./components/product/product";
import RecipeSearch from "./components/recipe/recipeSearch";
import { useEffect } from "react";
import RecipeDetails from "./components/recipe/singleRecipe";
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
          <Route path="/orderList" element={<OrderList />}></Route>
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
