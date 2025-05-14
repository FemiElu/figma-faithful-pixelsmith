
import React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "rounded-3xl font-semibold transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-[#006400] text-white hover:bg-[#005200]",
        secondary: "bg-[#E6F0E6] text-black hover:bg-[#D6E6D6]",
        outline: "border border-neutral-400 bg-white text-black hover:bg-gray-50",
        default: "bg-[#006400] text-white hover:bg-[#005200]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-20 px-6 text-xl",
        sm: "h-16 px-4 text-lg",
        lg: "h-24 px-8 text-2xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  fullWidth?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "default", fullWidth = false, className, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          { "w-full": fullWidth },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };

export default Button;
