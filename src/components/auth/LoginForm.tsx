
import React, { useState } from "react";
import { FormInput } from "./FormInput";
import { PasswordInput } from "./PasswordInput";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";

interface LoginFormProps {
  onSubmit?: (data: { phoneNumber: string; password: string }) => void;
  isLoading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ phoneNumber, password });
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen w-full bg-white px-6 py-10">
      <div className="flex flex-col items-center gap-[37px] w-full max-w-[591px]">
        <header className="flex flex-col items-start gap-4 w-full">
          <h1 className="w-full text-black text-center text-[32px] font-bold leading-[64px] max-md:text-[28px] max-md:leading-[48px] max-sm:text-2xl max-sm:leading-9">
            Complete Your Sign Up Process
          </h1>
          <p className="w-full text-[#4B4B4B] text-center text-2xl font-normal leading-[38.16px] max-md:text-xl max-sm:text-lg">
            Login to complete your registration and experience other opportunity
          </p>
        </header>
        
        <form onSubmit={handleSubmit} className="flex flex-col items-start gap-10 w-full">
          <div className="flex flex-col items-start gap-4 w-full">
            <div className="flex flex-col items-start gap-6 w-full">
              <FormInput
                label="Phone Number"
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                aria-label="Phone Number"
              />
              
              <PasswordInput
                label="Password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Password"
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
                  Signing In...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
