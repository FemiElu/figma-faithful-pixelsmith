
export interface UserData {
  phoneNumber: string;
  fullName: string;
  registrationNumber: string;
  nin: string;
  vehicleModel: string;
  driverLicense: string;
  address: string;
  profileImage: string | null;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  isFirstLogin: boolean;
  userData: UserData | null;
  login: (phoneNumber: string, password: string) => boolean;
  completeFirstLogin: () => void;
  logout: () => void;
  updateProfileImage: (imageUrl: string) => void;
  updatePassword: (newPassword: string) => void;
}
