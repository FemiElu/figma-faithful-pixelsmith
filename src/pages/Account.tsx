import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Loader2, Upload, Lock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";
import PasswordInput from "@/components/ui/PasswordInput";

const Account: React.FC = () => {
  const isMobile = useIsMobile();
  const [isUploading, setIsUploading] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  
  // Mock driver data
  const driverData = {
    fullName: "John Doe",
    registrationNumber: "DRV-2023-001",
    phoneNumber: "+2348012345678",
    nin: "12345678901",
    vehicleModel: "Toyota Hiace (2018)",
    driverLicense: "DRV-LIC-2023-001",
    address: "123 Main Street, Lagos, Nigeria",
    profileImage: null
  };

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
    
    // Simulate upload
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Profile image updated",
        description: "Your profile image has been successfully updated",
      });
    }, 2000);
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
    
    setIsChangingPassword(true);
    
    // Simulate API call
    setTimeout(() => {
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
    <div className="w-full min-h-screen bg-[#F9F9F9]">
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 px-4 py-6 md:pl-[42px] md:pr-[27px] md:pt-[83px] md:pb-0">
          <h1 className="text-3xl font-bold mb-6">Account Information</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profile Section */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-6">
                <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden relative flex items-center justify-center">
                  {driverData.profileImage ? (
                    <img src={driverData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-6xl text-gray-400">{driverData.fullName.charAt(0)}</div>
                  )}
                </div>
                
                <div className="w-full">
                  <label className="relative w-full">
                    <input 
                      type="file" 
                      accept="image/png, image/jpeg, image/jpg" 
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                    <Button 
                      variant="primary" 
                      className="w-full flex items-center justify-center gap-2"
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
                      label="Current Password"
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                    
                    <PasswordInput
                      label="New Password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    
                    <PasswordInput
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
                  <InfoItem label="Full Name" value={driverData.fullName} />
                  <InfoItem label="Registration Number" value={driverData.registrationNumber} />
                  <InfoItem label="Phone Number" value={driverData.phoneNumber} />
                  <InfoItem label="NIN" value={driverData.nin} />
                  <InfoItem label="Vehicle Model" value={driverData.vehicleModel} />
                  <InfoItem label="Driver's License" value={driverData.driverLicense} />
                  <InfoItem label="Address" value={driverData.address} />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
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
