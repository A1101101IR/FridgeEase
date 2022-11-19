import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/index.scss";
import FridgeEase from "./FridgeEase";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <FridgeEase />
  </BrowserRouter>
);
