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

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
      <div className="relative flex flex-col items-center">
        {/* Outer glowing ring with pulse scaling */}
        <div className="w-24 h-24 border-8 border-t-blue-500 border-b-purple-500 rounded-full animate-spin shadow-[0_0_30px_#3b82f6] animate-pulse-scale"></div>
        {/* Loading text */}
        <span className="absolute mt-32 text-white text-lg font-semibold tracking-wider animate-pulse-scale">
          Loading...
        </span>
      </div>
    </div>
  );
};

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

  if (loading) {
    return <Spinner />;
  }

  return <AuthProvider value={Userinfo}>{children}</AuthProvider>;
};

export default AuthContext;
