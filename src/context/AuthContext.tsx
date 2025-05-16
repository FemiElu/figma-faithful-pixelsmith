
import React, { createContext, useContext } from "react";
import { useAuthState } from "../hooks/use-auth-state";
import { AuthContextType } from "../types/auth";

// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isFirstLogin: false,
  userData: null,
  login: () => false,
  completeFirstLogin: () => {},
  logout: () => {},
  updateProfileImage: () => {},
  updatePassword: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authState = useAuthState();

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
