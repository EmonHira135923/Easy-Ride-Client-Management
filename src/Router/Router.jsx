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
import PrivateRouter from "./PrivateRouter.jsx";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Erro404 />,
    children: [
      { index: true, Component: Home },
      { path: "/login", Component: LogIn },
      { path: "/register", Component: Register },
      {
        path: "/allvehicles",
        loader: () =>
          fetch("http://localhost:3000/allvehicles").then((res) => res.json()),
        Component: AllVehicle,
      },
      {
        path: "/detailspage/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/allvehicles/${params.id}`),
        element: (
          <PrivateRouter>
            <CarDetails />
          </PrivateRouter>
        ),
      },
      {
        path: "/update",
        element: (
          <PrivateRouter>
            <UpdateVehicle />
          </PrivateRouter>
        ),
      },
      {
        path: "/add-vehicles",
        element: (
          <PrivateRouter>
            <AddVehicles />
          </PrivateRouter>
        ),
      },
      {
        path: "/my-vehicles",
        element: (
          <PrivateRouter>
            <Myvehicles />
          </PrivateRouter>
        ),
      },
      {
        path: "/my-booking",
        element: (
          <PrivateRouter>
            <MyBookings />
          </PrivateRouter>
        ),
      },
    ],
  },
]);

export default Router;
