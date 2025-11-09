import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { AuthProvider } from "./Provider";

const provider = new GoogleAuthProvider();

const AuthContext = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Email Sign
  const Createuser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Google Sign
  const Googlesign = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // Update Profle
  const UpdatedProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
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
    Createuser,
    Googlesign,
    UpdatedProfile,
  };

  return <AuthProvider value={Userinfo}>{children}</AuthProvider>;
};

export default AuthContext;
