
import React, { useContext, useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { AuthContext } from "@/App";
import { toast } from "@/hooks/use-toast";

const Login: React.FC = () => {
  const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = (data: { phoneNumber: string; password: string }) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, we would validate credentials against an API
      // For now, any non-empty values will "authenticate"
      if (data.phoneNumber && data.password) {
        login();
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
      } else {
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen w-full bg-[#F9F9F9]">
      <LoginForm 
        onSubmit={handleLogin} 
        isLoading={isLoading} 
      />
    </div>
  );
};

export default Login;
