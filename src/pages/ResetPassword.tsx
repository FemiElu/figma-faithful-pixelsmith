
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setIsLoading(true);
    
    // Get the phone number from session storage
    const phoneNumber = sessionStorage.getItem("reset_phone");
    
    if (!phoneNumber) {
      setError("Session expired. Please restart the password recovery process.");
      setIsLoading(false);
      return;
    }
    
    // Update the password in localStorage
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
      // If no credentials exist yet (for demo), create one
      const newCredentials = [{ phoneNumber, password: newPassword }];
      localStorage.setItem("driver_credentials", JSON.stringify(newCredentials));
    }
    
    // Simulate API call
    setTimeout(() => {
      // Clean up session storage
      sessionStorage.removeItem("reset_phone");
      
      // Update first login status to false for this user
      localStorage.setItem(`first_login_${phoneNumber}`, "false");
      
      toast({
        title: "Password reset successful",
        description: "You can now login with your new password",
      });
      
      navigate("/login");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen w-full bg-white px-6 py-10">
      <div className="flex flex-col items-center gap-[37px] w-full max-w-[591px]">
        <header className="flex flex-col items-start gap-4 w-full">
          <h1 className="w-full text-black text-center text-[32px] font-bold leading-[64px] max-md:text-[28px] max-md:leading-[48px] max-sm:text-2xl max-sm:leading-9">
            Reset Your Password
          </h1>
          <p className="w-full text-[#4B4B4B] text-center text-2xl font-normal leading-[38.16px] max-md:text-xl max-sm:text-lg">
            Create a new secure password for your account
          </p>
        </header>
        
        <form onSubmit={handleResetPassword} className="flex flex-col items-start gap-10 w-full">
          <div className="flex flex-col items-start gap-6 w-full">
            <PasswordInput
              id="new-password"
              label="New Password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            
            <PasswordInput
              id="confirm-password"
              label="Confirm Password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            
            {error && (
              <p className="text-red-500 text-sm w-full">{error}</p>
            )}
          </div>
          
          <div className="flex flex-col items-center gap-4 w-full">
            <Button 
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="h-20 w-full text-xl font-bold rounded-3xl max-sm:h-[60px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Resetting Password...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
