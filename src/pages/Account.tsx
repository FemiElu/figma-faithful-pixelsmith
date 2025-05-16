
import React, { useState, useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Loader2, Upload, Lock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { AuthContext } from "@/context/AuthContext";

const Account: React.FC = () => {
  const isMobile = useIsMobile();
  const { userData, updateProfileImage, updatePassword } = useContext(AuthContext);
  const [isUploading, setIsUploading] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type and size
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPEG or PNG image",
        variant: "destructive",
      });
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast({
        title: "File too large",
        description: "Image size should be less than 5MB",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    // Convert file to base64 string for storage in localStorage
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result as string;
      
      // Update the profile image
      updateProfileImage(base64Image);
      
      setIsUploading(false);
      toast({
        title: "Profile image updated",
        description: "Your profile image has been successfully updated",
      });
    };
    
    reader.onerror = () => {
      setIsUploading(false);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image",
        variant: "destructive",
      });
    };
  };
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    // In a real app, we would verify the current password
    // For demo, we'll accept any non-empty value
    if (!currentPassword) {
      setPasswordError("Please enter your current password");
      return;
    }
    
    setIsChangingPassword(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update the password
      updatePassword(newPassword);
      
      setIsChangingPassword(false);
      setShowPasswordChange(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      toast({
        title: "Password changed successfully",
        description: "Your password has been updated",
      });
    }, 1500);
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6">Account Information</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Section */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden relative flex items-center justify-center">
              {userData?.profileImage ? (
                <img 
                  src={userData.profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-6xl text-gray-400">
                  {userData?.fullName ? userData.fullName.charAt(0) : "U"}
                </div>
              )}
            </div>
            
            <div className="w-full">
              <label className="relative w-full cursor-pointer">
                <input 
                  type="file" 
                  accept="image/png, image/jpeg, image/jpg" 
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
                <Button 
                  variant="primary" 
                  className="w-full flex items-center justify-center gap-2 cursor-pointer"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5" />
                      Upload Profile Image
                    </>
                  )}
                </Button>
              </label>
            </div>
            
            <div className="w-full">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={() => setShowPasswordChange(!showPasswordChange)}
              >
                <Lock className="h-5 w-5" />
                Change Password
              </Button>
            </div>
            
            {showPasswordChange && (
              <form onSubmit={handlePasswordChange} className="w-full space-y-4 mt-4">
                <PasswordInput
                  id="current-password"
                  label="Current Password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
                
                <PasswordInput
                  id="new-password-account"
                  label="New Password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                
                <PasswordInput
                  id="confirm-password-account"
                  label="Confirm New Password"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                
                {passwordError && (
                  <p className="text-red-500 text-sm">{passwordError}</p>
                )}
                
                <Button 
                  type="submit" 
                  variant="primary"
                  className="w-full"
                  disabled={isChangingPassword}
                >
                  {isChangingPassword ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
        
        {/* Driver Information */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Driver Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <InfoItem label="Full Name" value={userData?.fullName || ""} />
              <InfoItem label="Registration Number" value={userData?.registrationNumber || ""} />
              <InfoItem label="Phone Number" value={userData?.phoneNumber || ""} />
              <InfoItem label="NIN" value={userData?.nin || ""} />
              <InfoItem label="Vehicle Model" value={userData?.vehicleModel || ""} />
              <InfoItem label="Driver's License" value={userData?.driverLicense || ""} />
              <InfoItem label="Address" value={userData?.address || ""} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper component for displaying information items
const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col space-y-1">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default Account;
