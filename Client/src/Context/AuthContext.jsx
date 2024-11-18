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

  const updateUserWithToken = async (currentUser) => {
    if (!currentUser) {
      setUser(null);
      setLoading(false);
      return;
    }

    const token = await currentUser.getIdToken();
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken?.role;
    const newUser = { ...currentUser, Role: userRole };
    setUser(newUser);
    console.log("User updated:", newUser);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, updateUserWithToken);
    return () => unsubscribe();
  }, []);

  const logOut = () => {
    return signOut(auth);
  };

  // Add a method to force update user
  const refreshUser = async () => {
    if (auth.currentUser) {
      setLoading(true);
      await updateUserWithToken(auth.currentUser);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center flex-col justify-center h-screen ">
        <Loader2 className="h-20 w-20 animate-spin" />
        <br />
        <h2 className="mt-4 text-xl">Loading...</h2>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
