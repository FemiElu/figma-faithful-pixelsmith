import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col items-start gap-3 w-full">
      <div className="w-full text-[#131313] text-xl font-bold">
        {label}
      </div>
      <div className="flex items-center w-full h-20 border border-neutral-400 bg-white relative px-5 rounded-3xl max-sm:h-[60px]">
        <input
          className={`w-full h-full bg-transparent text-[#7A7A7A] text-lg font-normal leading-5 max-sm:text-base ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};
