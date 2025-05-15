
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "@/components/auth/FormInput";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { AuthContext } from "@/context/AuthContext";

const CompleteSignup: React.FC = () => {
  const { login } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Verify if this is a valid driver with valid OTP password
      // For demo purposes, we'll accept any non-empty values
      if (phoneNumber && password) {
        // Store in localStorage to simulate onboarding
        const userData = {
          fullName: "John Doe",
          registrationNumber: "DRV-2023-001",
          phoneNumber: phoneNumber,
          nin: "12345678901",
          vehicleModel: "Toyota Hiace (2018)",
          driverLicense: "DRV-LIC-2023-001",
          address: "123 Main Street, Lagos, Nigeria",
          profileImage: null
        };
        
        // Store user data
        localStorage.setItem("driver_user_data", JSON.stringify(userData));
        
        // Set auth state
        localStorage.setItem("driver_auth", "true");
        localStorage.setItem("first_login", "true");
        
        // Log in the user
        login(phoneNumber, password);
        
        // Show success message
        toast({
          title: "Verification successful",
          description: "Please set your new password.",
        });
        
        // Navigate to password change screen
        navigate("/change-password");
      } else {
        toast({
          title: "Verification failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <section className="flex flex-col items-center justify-center min-h-screen w-full bg-white px-6 py-10">
      <div className="flex flex-col items-center gap-[37px] w-full max-w-[591px]">
        <header className="flex flex-col items-start gap-4 w-full">
          <h1 className="w-full text-black text-center text-[32px] font-bold leading-[64px] max-md:text-[28px] max-md:leading-[48px] max-sm:text-2xl max-sm:leading-9">
            Complete Your Sign Up Process
          </h1>
          <p className="w-full text-[#4B4B4B] text-center text-2xl font-normal leading-[38.16px] max-md:text-xl max-sm:text-lg">
            Login to complete your registration and experience other opportunities
          </p>
        </header>
        
        <form onSubmit={handleSignup} className="flex flex-col items-start gap-10 w-full">
          <div className="flex flex-col items-start gap-4 w-full">
            <div className="flex flex-col items-start gap-6 w-full">
              <FormInput
                label="Phone Number"
                type="tel"
                placeholder="Enter your registered phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                aria-label="Phone Number"
              />
              
              <PasswordInput
                id="otp-password"
                label="One-Time Password"
                placeholder="Enter your one-time password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-4 w-full">
            <Button 
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="h-20 w-full text-xl font-bold rounded-3xl max-sm:h-[60px]"
              aria-label="Sign Up"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Complete Sign Up"
              )}
            </Button>

            <p className="text-[#4B4B4B] text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-[#006400] font-medium hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CompleteSignup;
