import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { AuthProvider } from "./Provider";

const provider = new GoogleAuthProvider();

const AuthContext = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Email Register
  const Createuser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Email Sign In
  const UserSignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Sign In
  const Googlesign = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // Update Profile
  const UpdatedProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Sign Out
  const Signout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Observer Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const Userinfo = {
    user,
    loading,
    Createuser,
    Googlesign,
    UpdatedProfile,
    UserSignIn,
    Signout,
  };

  return <AuthProvider value={Userinfo}>{children}</AuthProvider>;
};

export default AuthContext;
