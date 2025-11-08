import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../layout/Root.jsx";
import Home from "../Pages/Home/Home.jsx";
import Register from "../Pages/Register/Register.jsx";
import LogIn from "../Pages/LogIn/LogIn.jsx";
import Erro404 from "../Pages/ErrorPage/Error404.jsx";
const Router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Erro404></Erro404>,
    children: [
      { index: true, Component: Home },
      { path: "/login", Component: LogIn },
      { path: "/register", Component: Register },
    ],
  },
]);

export default Router;
