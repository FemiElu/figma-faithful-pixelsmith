import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "default" | "sm" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "default",
  fullWidth = false,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        "rounded-3xl font-semibold transition-colors",
        {
          // Variants
          "bg-[#006400] text-white hover:bg-[#005200]": variant === "primary",
          "bg-[#E6F0E6] text-black hover:bg-[#D6E6D6]": variant === "secondary",
          "border border-neutral-400 bg-white text-black hover:bg-gray-50": variant === "outline",
          
          // Sizes
          "h-20 px-6 text-xl": size === "default",
          "h-16 px-4 text-lg": size === "sm",
          "h-24 px-8 text-2xl": size === "lg",
          
          // Width
          "w-full": fullWidth,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
