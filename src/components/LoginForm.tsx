import React, { useState } from "react";
import PasswordInput from "./ui/PasswordInput";
import Button from "./ui/Button";

interface LoginFormProps {
  onSubmit?: (data: { username: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { username: "", password: "" };

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm() && onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <label htmlFor="username" className="text-[#131313] text-xl font-semibold">
            Username
          </label>
          <div className="flex h-20 items-center border border-neutral-400 bg-white px-5 rounded-3xl">
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              className="w-full text-[#7A7A7A] text-lg outline-none"
              value={formData.username}
              onChange={handleChange}
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? "username-error" : undefined}
            />
          </div>
          {errors.username && (
            <p id="username-error" className="text-red-500 text-sm mt-1">
              {errors.username}
            </p>
          )}
        </div>

        <PasswordInput
          id="password"
          name="password"
          placeholder="Password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
        />
        {errors.password && (
          <p id="password-error" className="text-red-500 text-sm mt-1">
            {errors.password}
          </p>
        )}
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button type="submit" variant="primary" fullWidth>
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
