import React, { useState } from "react";
import { FormInput } from "./FormInput";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label = "Password",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-start gap-3 w-full">
      <div className="w-full text-black text-xl font-medium leading-5">
        {label}
      </div>
      <div className="flex items-center w-full h-20 border border-neutral-400 bg-white relative px-5 rounded-3xl max-sm:h-[60px]">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full h-full bg-transparent text-[#7A7A7A] text-lg font-normal leading-5 max-sm:text-base"
          {...props}
        />
        <button 
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-[20px]"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5.24951C4.5 5.24951 1.5 12.0005 1.5 12.0005C1.5 12.0005 4.5 18.7495 12 18.7495C19.5 18.7495 22.5 12.0005 22.5 12.0005C22.5 12.0005 19.5 5.24951 12 5.24951Z" stroke="#3D3D3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 15.7495C14.0711 15.7495 15.75 14.0706 15.75 11.9995C15.75 9.92836 14.0711 8.24951 12 8.24951C9.92893 8.24951 8.25 9.92836 8.25 11.9995C8.25 14.0706 9.92893 15.7495 12 15.7495Z" stroke="#3D3D3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5299 9.46992L9.46992 14.5299C8.81992 13.8799 8.41992 12.9899 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C12.9899 8.41992 13.8799 8.81992 14.5299 9.46992Z" stroke="#3D3D3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M17.8198 5.77047C16.0698 4.45047 14.0698 3.73047 11.9998 3.73047C8.46984 3.73047 5.17984 5.81047 2.88984 9.41047C1.98984 10.8205 1.98984 13.1905 2.88984 14.6005C3.67984 15.8405 4.59984 16.9105 5.59984 17.7705" stroke="#3D3D3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M8.41992 19.5297C9.55992 20.0097 10.7699 20.2697 11.9999 20.2697C15.5299 20.2697 18.8199 18.1897 21.1099 14.5897C22.0099 13.1797 22.0099 10.8097 21.1099 9.39969C20.7799 8.87969 20.4199 8.38969 20.0499 7.92969" stroke="#3D3D3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M15.5095 12.7002C15.2495 14.1102 14.0995 15.2602 12.6895 15.5202" stroke="#3D3D3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M9.47 14.5303L2 22.0003" stroke="#3D3D3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M21.9993 2L14.5293 9.47" stroke="#3D3D3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};
