
import { useState, useEffect } from "react";
import { UserData } from "../types/auth";
import { defaultDriverData, loadAuthState, updatePasswordInStorage, verifyCredentials } from "../utils/auth-utils";

export const useAuthState = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  
  // Load auth state and user data from localStorage on initial load
  useEffect(() => {
    const { isAuthenticated: authState, isFirstLogin: loginState, userData: userState } = loadAuthState();
    
    setIsAuthenticated(authState);
    setIsFirstLogin(loginState);
    
    if (userState) {
      setUserData(userState);
    }
  }, []);
  
  const login = (phoneNumber: string, password: string): boolean => {
    // Check if this is a new signup with OTP
    const isNewSignup = localStorage.getItem("first_login") === "true";
    
    const userExists = verifyCredentials(phoneNumber, password);
    
    if (userExists) {
      // Load user data based on phone number
      const storedUserData = localStorage.getItem("driver_user_data");
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      } else {
        // For demo, load default data if no stored data
        setUserData({ ...defaultDriverData, phoneNumber });
        localStorage.setItem("driver_user_data", JSON.stringify({ ...defaultDriverData, phoneNumber }));
      }
      
      setIsAuthenticated(true);
      localStorage.setItem("driver_auth", "true");
      
      // Check if it's first login or not
      const firstLoginStatus = localStorage.getItem(`first_login_${phoneNumber}`);
      if (firstLoginStatus === "false") {
        setIsFirstLogin(false);
        localStorage.setItem("first_login", "false");
      } else {
        setIsFirstLogin(true);
        localStorage.setItem("first_login", "true");
      }
      
      return true;
    } else if (isNewSignup) {
      // For new signup without existing credentials, we use the OTP flow
      // The auth state is set in the CompleteSignup component
      setIsAuthenticated(true);
      
      // Load user data if available
      const storedUserData = localStorage.getItem("driver_user_data");
      if (storedUserData) {
        try {
          setUserData(JSON.parse(storedUserData));
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
      
      return true;
    }
    
    return false;
  };
  
  const completeFirstLogin = () => {
    setIsFirstLogin(false);
    localStorage.setItem("first_login", "false");
    if (userData) {
      localStorage.setItem(`first_login_${userData.phoneNumber}`, "false");
    }
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    localStorage.removeItem("driver_auth");
    // Do not remove credentials or user data on logout
  };
  
  const updateProfileImage = (imageUrl: string) => {
    if (userData) {
      const updatedUserData = { ...userData, profileImage: imageUrl };
      setUserData(updatedUserData);
      localStorage.setItem("driver_user_data", JSON.stringify(updatedUserData));
    }
  };
  
  const updatePassword = (newPassword: string) => {
    if (userData) {
      updatePasswordInStorage(userData.phoneNumber, newPassword);
    }
  };

  return {
    isAuthenticated,
    isFirstLogin,
    userData,
    login,
    completeFirstLogin,
    logout,
    updateProfileImage,
    updatePassword
  };
};
