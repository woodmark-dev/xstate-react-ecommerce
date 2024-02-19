import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Categories from "./pages/categories/categories-component.jsx";
import RootContext from "./RootContext.jsx";
import Products from "./pages/products/product-component.jsx";
import ProductDetails from "./pages/product-details/product-details-component.jsx";
import Cart from "./pages/cart/cart-component.jsx";
import Favorites from "./pages/favorites/favorites-component.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Categories />,
      },
      {
        path: "home/category/:name",
        element: <Products />,
      },
      {
        path: "home/category/:name/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RootContext>
      <RouterProvider router={router} />
    </RootContext>
  </React.StrictMode>
);
