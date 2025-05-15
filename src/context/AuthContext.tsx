
import React, { createContext, useState, useEffect, useContext } from "react";

// Define interfaces for our data types
interface UserData {
  phoneNumber: string;
  fullName: string;
  registrationNumber: string;
  nin: string;
  vehicleModel: string;
  driverLicense: string;
  address: string;
  profileImage: string | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isFirstLogin: boolean;
  userData: UserData | null;
  login: (phoneNumber: string, password: string) => boolean;
  completeFirstLogin: () => void;
  logout: () => void;
  updateProfileImage: (imageUrl: string) => void;
  updatePassword: (newPassword: string) => void;
}

// Default driver data for demo purposes
const defaultDriverData: UserData = {
  fullName: "John Doe",
  registrationNumber: "DRV-2023-001",
  phoneNumber: "+2348012345678",
  nin: "12345678901",
  vehicleModel: "Toyota Hiace (2018)",
  driverLicense: "DRV-LIC-2023-001",
  address: "123 Main Street, Lagos, Nigeria",
  profileImage: null
};

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  
  // Load auth state and user data from localStorage on initial load
  useEffect(() => {
    const auth = localStorage.getItem("driver_auth");
    const firstLogin = localStorage.getItem("first_login");
    const storedUserData = localStorage.getItem("driver_user_data");
    
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    
    if (firstLogin === "false") {
      setIsFirstLogin(false);
    }

    if (storedUserData) {
      try {
        setUserData(JSON.parse(storedUserData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);
  
  const login = (phoneNumber: string, password: string): boolean => {
    // Get stored credentials
    const storedCredentials = localStorage.getItem("driver_credentials");
    
    if (storedCredentials) {
      try {
        const parsedCredentials = JSON.parse(storedCredentials);
        const userExists = parsedCredentials.find(
          (cred: { phoneNumber: string; password: string }) => 
            cred.phoneNumber === phoneNumber && cred.password === password
        );
        
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
        }
      } catch (error) {
        console.error("Error parsing credentials:", error);
      }
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
      const storedCredentials = localStorage.getItem("driver_credentials");
      
      if (storedCredentials) {
        try {
          const parsedCredentials = JSON.parse(storedCredentials);
          const updatedCredentials = parsedCredentials.map(
            (cred: { phoneNumber: string; password: string }) => 
              cred.phoneNumber === userData.phoneNumber 
                ? { ...cred, password: newPassword } 
                : cred
          );
          
          localStorage.setItem("driver_credentials", JSON.stringify(updatedCredentials));
        } catch (error) {
          console.error("Error updating password:", error);
        }
      } else {
        // If no credentials exist yet, create one
        const newCredentials = [{ phoneNumber: userData.phoneNumber, password: newPassword }];
        localStorage.setItem("driver_credentials", JSON.stringify(newCredentials));
      }
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        isFirstLogin, 
        userData,
        login, 
        completeFirstLogin, 
        logout,
        updateProfileImage,
        updatePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
