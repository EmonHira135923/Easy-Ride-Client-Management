import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../layout/Root.jsx";
import Home from "../Pages/Home/Home.jsx";
import Register from "../Pages/Register/Register.jsx";
import LogIn from "../Pages/LogIn/LogIn.jsx";
import Erro404 from "../Pages/ErrorPage/Error404.jsx";
import AllVehicle from "../Pages/AllVehicle/AllVehicle.jsx";
import AddVehicles from "../Pages/AllVehicle/AddVehicle/AddVehicles.jsx";
import MyBookings from "../Pages/MyVehicle/MyBookings.jsx";
import Myvehicles from "../Pages/MyVehicle/Myvehicles.jsx";
import UpdateVehicle from "../Pages/UpdateVehicle/UpdateVehicle.jsx";
import CarDetails from "../Componets/CarDetails/CarDetails.jsx";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Erro404></Erro404>,
    children: [
      { index: true, Component: Home },
      { path: "/login", Component: LogIn },
      { path: "/register", Component: Register },
      {
        path: "/allvehicles",
        loader: () => fetch("http://localhost:3000/allvehicles"),
        Component: AllVehicle,
      },
      { path: "/detailspage/:id", element: <CarDetails></CarDetails> },
      { path: "/update", element: <UpdateVehicle></UpdateVehicle> },
      { path: "/add-vehicles", element: <AddVehicles></AddVehicles> },
      { path: "/my-vehicles", element: <Myvehicles></Myvehicles> },
      { path: "/my-booking", element: <MyBookings></MyBookings> },
    ],
  },
]);

export default Router;
