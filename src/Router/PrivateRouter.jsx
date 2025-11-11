import React from "react";
import { Navigate, useLocation } from "react-router";
import { use } from "react";
import { AuthProvider } from "../ContextProvider/Provider";

const PrivateRouter = ({ children }) => {
  const { user } = use(AuthProvider);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default PrivateRouter;
