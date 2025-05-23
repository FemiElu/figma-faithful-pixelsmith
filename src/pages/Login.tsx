
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FormInput } from "@/components/auth/FormInput";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

const Login: React.FC = () => {
  const { login } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const success = login(phoneNumber, password);
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
      } else {
        toast({
          title: "Login failed",
          description: "Invalid phone number or password. Please try again.",
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
            Welcome Back
          </h1>
          <p className="w-full text-[#4B4B4B] text-center text-2xl font-normal leading-[38.16px] max-md:text-xl max-sm:text-lg">
            Login to your driver account
          </p>
        </header>
        
        <form onSubmit={handleLogin} className="flex flex-col items-start gap-10 w-full">
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
                id="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="flex justify-end w-full">
                <Link to="/forgot-password" className="text-[#006400] text-sm font-medium hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-4 w-full">
            <Button 
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="h-20 w-full text-xl font-bold rounded-3xl max-sm:h-[60px]"
              aria-label="Login"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>

            <p className="text-[#4B4B4B] text-center mt-4">
              Don't have an account yet?{" "}
              <Link to="/complete-signup" className="text-[#006400] font-medium hover:underline">
                Complete your sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
