import { Routes, Route } from "react-router-dom";
import Account from "./components/account";
import Fridge from "./components/fridge";
import Header from "./components/header";
import Navigation from "./components/navigation";
import OrderList from "./components/orderList";
import Recipe from "./components/recipe";
import Main from "./main";

function App() {
  return (
    <div className="container">
      <section className="main">
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/fridge" element={<Fridge />}></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/orderList" element={<OrderList />}></Route>
          <Route path="/recipe" element={<Recipe />}></Route>
        </Routes>
      </section>
      <Navigation />
    </div>
  );
}

export default App;
