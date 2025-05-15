
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordInputProps {
  id?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any; // For additional props like aria attributes
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  name,
  value,
  placeholder,
  label,
  onChange,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <label htmlFor={id} className="text-[#131313] text-xl font-semibold">
          {label}
        </label>
      )}
      <div className="flex h-20 items-center border border-neutral-400 bg-white px-5 rounded-3xl">
        <input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="w-full text-[#7A7A7A] text-lg outline-none"
          value={value}
          onChange={onChange}
          {...props}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="text-gray-500 focus:outline-none ml-2"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
