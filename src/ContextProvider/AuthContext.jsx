import React from "react";
import { AuthProvider } from "./Provider";

const name = {
  person: "Emon",
  age: 23,
};

const Userinfo = {
  name,
};

const AuthContext = ({ children }) => {
  return <AuthProvider value={Userinfo}>{children}</AuthProvider>;
};

export default AuthContext;
