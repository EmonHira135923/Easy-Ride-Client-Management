import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import Router from "../src/Router/Router";
import { ToastContainer } from "react-toastify";
import AuthContext from "./ContextProvider/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContext>
      <RouterProvider router={Router}></RouterProvider>
    </AuthContext>
    <ToastContainer position="top-center" />
  </StrictMode>
);
