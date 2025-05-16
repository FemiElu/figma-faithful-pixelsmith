
import { UserData } from "../types/auth";

// Default driver data for demo purposes
export const defaultDriverData: UserData = {
  fullName: "John Doe",
  registrationNumber: "DRV-2023-001",
  phoneNumber: "+2348012345678",
  nin: "12345678901",
  vehicleModel: "Toyota Hiace (2018)",
  driverLicense: "DRV-LIC-2023-001",
  address: "123 Main Street, Lagos, Nigeria",
  profileImage: null
};

export const loadAuthState = () => {
  const auth = localStorage.getItem("driver_auth");
  const firstLogin = localStorage.getItem("first_login");
  const storedUserData = localStorage.getItem("driver_user_data");
  
  let userData = null;
  if (storedUserData) {
    try {
      userData = JSON.parse(storedUserData);
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }
  
  return {
    isAuthenticated: auth === "true",
    isFirstLogin: firstLogin !== "false",
    userData
  };
};

export const updatePasswordInStorage = (phoneNumber: string, newPassword: string) => {
  const storedCredentials = localStorage.getItem("driver_credentials");
  
  if (storedCredentials) {
    try {
      const parsedCredentials = JSON.parse(storedCredentials);
      const updatedCredentials = parsedCredentials.map(
        (cred: { phoneNumber: string; password: string }) => 
          cred.phoneNumber === phoneNumber 
            ? { ...cred, password: newPassword } 
            : cred
      );
      
      localStorage.setItem("driver_credentials", JSON.stringify(updatedCredentials));
    } catch (error) {
      console.error("Error updating password:", error);
    }
  } else {
    // If no credentials exist yet, create one
    const newCredentials = [{ phoneNumber, password: newPassword }];
    localStorage.setItem("driver_credentials", JSON.stringify(newCredentials));
  }
};

export const verifyCredentials = (phoneNumber: string, password: string) => {
  const storedCredentials = localStorage.getItem("driver_credentials");
  
  if (storedCredentials) {
    try {
      const parsedCredentials = JSON.parse(storedCredentials);
      return parsedCredentials.find(
        (cred: { phoneNumber: string; password: string }) => 
          cred.phoneNumber === phoneNumber && cred.password === password
      );
    } catch (error) {
      console.error("Error parsing credentials:", error);
    }
  }
  
  return false;
};
