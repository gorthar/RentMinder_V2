import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { PropTypes } from "prop-types";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        setUser(null);
        return;
      }
      const token = currentUser.accessToken;
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken?.role;
      const newUser = { ...currentUser, Role: userRole };
      console.log(newUser);
      setUser(newUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const logOut = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
