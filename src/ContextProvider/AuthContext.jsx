import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { AuthProvider } from "./Provider";

const AuthContext = ({ children }) => {
  // Email Sign
  const Createuser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const Userinfo = {
    Createuser,
  };

  return <AuthProvider value={Userinfo}>{children}</AuthProvider>;
};

export default AuthContext;
