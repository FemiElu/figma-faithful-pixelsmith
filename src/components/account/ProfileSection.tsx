
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Loader2, Upload, Lock } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { toast } from "@/hooks/use-toast";
import { useProfileImage } from "@/hooks/use-profile-image";

export const ProfileSection = () => {
  const { userData, updatePassword } = useContext(AuthContext);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const { isUploading, handleImageUpload, fileInputRef, triggerFileInput } = useProfileImage();
  
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
    if (!currentPassword) {
      setPasswordError("Please enter your current password");
      return;
    }
    
    setIsChangingPassword(true);
    
    // Simulate API call
    setTimeout(() => {
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
          <input 
            type="file" 
            ref={fileInputRef}
            accept="image/png, image/jpeg, image/jpg" 
            className="hidden"
            onChange={handleImageUpload}
            disabled={isUploading}
          />
          <Button 
            variant="primary" 
            className="w-full flex items-center justify-center gap-2 cursor-pointer"
            disabled={isUploading}
            onClick={triggerFileInput}
            type="button"
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
        </div>
        
        <div className="w-full">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={() => setShowPasswordChange(!showPasswordChange)}
            type="button"
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
  );
};
