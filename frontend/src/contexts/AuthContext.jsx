import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("claimantUser");
    const expiresAt = localStorage.getItem("expiresAt");

    if (user && expiresAt) {
      try {
        const currentTime = Date.now();

        if (currentTime < expiresAt) {
          const parsedUser = JSON.parse(user);
          setAuthUser(parsedUser);
        }
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    } else {
      localStorage.removeItem("chatUser");
      localStorage.removeItem("expiresAt");
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (authUser) {
      localStorage.setItem("claimantUser", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("claimantUser");
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
