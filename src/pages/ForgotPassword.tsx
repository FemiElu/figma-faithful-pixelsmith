
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "@/components/auth/FormInput";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ForgotPassword: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleRequestOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Check if the phone number exists in our storage
    const storedCredentials = localStorage.getItem("driver_credentials");
    let phoneExists = false;
    
    if (storedCredentials) {
      try {
        const parsedCredentials = JSON.parse(storedCredentials);
        phoneExists = parsedCredentials.some(
          (cred: { phoneNumber: string }) => cred.phoneNumber === phoneNumber
        );
      } catch (error) {
        console.error("Error parsing credentials:", error);
      }
    }
    
    // Simulate sending OTP
    setTimeout(() => {
      setIsLoading(false);
      
      if (phoneExists || (!storedCredentials && phoneNumber)) {
        // For demo purposes, we'll pretend an OTP was sent for any valid format
        toast({
          title: "OTP Sent",
          description: `A verification code has been sent to ${phoneNumber}`,
        });
        
        // Store phone in session for verification
        sessionStorage.setItem("reset_phone", phoneNumber);
        
        // Move to OTP step
        setStep("otp");
      } else {
        toast({
          title: "Phone number not found",
          description: "This phone number is not registered in our system.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, verify OTP with backend
    // For demo, we'll accept any non-empty OTP
    setTimeout(() => {
      setIsLoading(false);
      
      if (otp) {
        toast({
          title: "OTP verified",
          description: "Please set your new password.",
        });
        
        // Navigate to password reset screen
        navigate("/reset-password");
      } else {
        toast({
          title: "Invalid OTP",
          description: "The verification code you entered is incorrect.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen w-full bg-white px-6 py-10">
      <div className="flex flex-col items-center gap-[37px] w-full max-w-[591px]">
        <header className="flex flex-col items-start gap-4 w-full">
          <h1 className="w-full text-black text-center text-[32px] font-bold leading-[64px] max-md:text-[28px] max-md:leading-[48px] max-sm:text-2xl max-sm:leading-9">
            Forgot Password
          </h1>
          {step === "phone" ? (
            <p className="w-full text-[#4B4B4B] text-center text-2xl font-normal leading-[38.16px] max-md:text-xl max-sm:text-lg">
              Enter your registered phone number to receive a verification code
            </p>
          ) : (
            <p className="w-full text-[#4B4B4B] text-center text-2xl font-normal leading-[38.16px] max-md:text-xl max-sm:text-lg">
              Enter the verification code sent to your phone
            </p>
          )}
        </header>
        
        {step === "phone" ? (
          <form onSubmit={handleRequestOTP} className="flex flex-col items-start gap-10 w-full">
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
            </div>
            
            <div className="flex flex-col items-center gap-4 w-full">
              <Button 
                type="submit"
                variant="primary"
                disabled={isLoading}
                className="h-20 w-full text-xl font-bold rounded-3xl max-sm:h-[60px]"
                aria-label="Request OTP"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Send Verification Code"
                )}
              </Button>
              
              <Button 
                type="button"
                variant="outline"
                onClick={() => navigate("/login")}
                className="h-20 w-full text-xl font-bold rounded-3xl max-sm:h-[60px]"
                aria-label="Back to Login"
              >
                Back to Login
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="flex flex-col items-start gap-10 w-full">
            <div className="flex flex-col items-start gap-6 w-full">
              <FormInput
                label="Verification Code"
                type="text"
                placeholder="Enter the 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
                aria-label="Verification Code"
                className="text-center text-xl tracking-widest"
              />
              
              <div className="flex justify-center w-full">
                <button 
                  type="button"
                  onClick={handleRequestOTP}
                  className="text-[#006400] text-sm font-medium hover:underline"
                >
                  Didn't receive the code? Resend
                </button>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-4 w-full">
              <Button 
                type="submit"
                variant="primary"
                disabled={isLoading}
                className="h-20 w-full text-xl font-bold rounded-3xl max-sm:h-[60px]"
                aria-label="Verify Code"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Code"
                )}
              </Button>
              
              <Button 
                type="button"
                variant="outline"
                onClick={() => setStep("phone")}
                className="h-20 w-full text-xl font-bold rounded-3xl max-sm:h-[60px]"
                aria-label="Back"
              >
                Back
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;
