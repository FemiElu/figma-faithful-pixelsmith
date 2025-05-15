
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";
import { AuthContext } from "@/App";
import { toast } from "@/hooks/use-toast";

const ChangePassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { completeFirstLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
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
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, we would update the password via API
      completeFirstLogin();
      toast({
        title: "Password updated successfully",
        description: "You can now use your new password to log in",
      });
      navigate("/");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen w-full bg-white px-6 py-10">
      <div className="flex flex-col items-center gap-[37px] w-full max-w-[591px]">
        <header className="flex flex-col items-start gap-4 w-full">
          <h1 className="w-full text-black text-center text-[32px] font-bold leading-[64px] max-md:text-[28px] max-md:leading-[48px] max-sm:text-2xl max-sm:leading-9">
            Change Your Password
          </h1>
          <p className="w-full text-[#4B4B4B] text-center text-2xl font-normal leading-[38.16px] max-md:text-xl max-sm:text-lg">
            Create a new secure password for your account
          </p>
        </header>
        
        <form onSubmit={handleSubmit} className="flex flex-col items-start gap-10 w-full">
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
                  Updating Password...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
