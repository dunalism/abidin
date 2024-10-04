// Documentation: https://reactrouter.com/en/main/routers/create-browser-router
import { createBrowserRouter } from "react-router-dom";

import Dashboard from "../views/dashboard";
import Layout from "../views/layout";
import About from "../views/about";
import Homepage from "../views/homepage";
import Product from "../views/Product";
import ListPage from "../views/ListPage";
import Categories from "../views/Categories";
import AddProduct from "../views/AddProduct";
import TheCategory from "../views/TheCategory";
import WatchList from "../views/Watchlist";
import SellPage from "../views/SellPage";
import Register from "../components/auth/register";
import Login from "../components/auth/login";
import SearchCategory from "../views/SearchCategory";
// ... add more imports here

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Wrap routes inside Layout
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/about", element: <About /> },
      { path: "/product", element: <Product /> },

      { path: "/list", element: <ListPage /> },
      { path: "/categories", element: <Categories /> },
      { path: "/categories/:keyword", element: <SearchCategory />},
      { path: "/addproduct", element: <AddProduct /> },
      { path: "/categories/list", element: <TheCategory /> },
      { path: "/dashboard", element: <Dashboard /> },

      // { path: "/watchlist", element: <Watchlist /> },
      // { path: "/watclist", element: <WatchList /> },
      { path: "/watchlist", element: <WatchList /> },

      { path: "/sellpage", element: <SellPage /> },

      // Add other routes here if needed
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
