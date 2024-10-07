import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { PropTypes } from "prop-types";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { jwtDecode } from "jwt-decode";
import { Loader2 } from "lucide-react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const token = currentUser.accessToken;
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken?.role;
      const newUser = { ...currentUser, Role: userRole };
      setUser(newUser);
      console.log("User:", newUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const logOut = () => {
    return signOut(auth);
  };

  if (loading) {
    return (
      <div className="flex items-center flex-col justify-center h-screen ">
        <Loader2 className="h-20 w-20 animate-spin" />
        <br />
        <h2 className="mt-4 text-xl">Loading...</h2>
      </div>
    ); // Or any loading indicator
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
