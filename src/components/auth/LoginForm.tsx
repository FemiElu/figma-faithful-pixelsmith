import React, { useState } from "react";
import { FormInput } from "./FormInput";
import { PasswordInput } from "./PasswordInput";

interface LoginFormProps {
  onSubmit?: (data: { phoneNumber: string; password: string }) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ phoneNumber, password });
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-[screen] w-full bg-white px-6 py-10">
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Password"
              />
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-4 w-full">
            <button 
              type="submit"
              className="h-20 w-full bg-[#006400] text-white text-xl font-bold rounded-3xl max-sm:h-[60px] hover:bg-[#005200] transition-colors"
              aria-label="Sign Up"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};