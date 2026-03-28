import React, { useState } from "react";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import { Link } from "react-router";
import { loginSchema, registerSchema } from "../../../schemas/auth.schema";
import type { LoginData, RegisterData } from "../../../types/auth.types";
import { EyeIcon } from "../../../assets/icons/EyeIcon";
import { EyeOffIcon } from "../../../assets/icons/EyeOffIcon";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (data: LoginData | RegisterData) => void;
  loading?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, loading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const schema = type === "login" ? loginSchema : registerSchema;
    if (type === "register") {
      if (formData.password !== formData.confirmPassword) {
        setError((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
        return;
      }
    }

    const result: any = schema.safeParse(formData);

    if (result.success) {
      onSubmit(result.value);
      setError({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      const formattedErrors: any = {};

      result.errors.forEach((err: any) => {
        const key = err.path[0];
        formattedErrors[key] = err.message;
      });

      setError((prev) => ({
        ...prev,
        ...formattedErrors,
      }));
    }
  };
  return (
    <form className="flex flex-col gap-16" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        {type === "register" && (
          <Input
            id="name"
            label="Full Name"
            placeholder="E.g. Julian Montgomery"
            onChange={handleChange}
            value={formData.name}
            error={error.name}
          />
        )}
        <Input
          id="email"
          label="Email Address"
          placeholder="curator@architectural.com"
          type="email"
          onChange={handleChange}
          value={formData.email}
          error={error.email}
        />
        <Input
          id="password"
          label="Password"
          placeholder="••••••••"
          type={showPassword ? "text" : "password"}
          onChange={handleChange}
          value={formData.password}
          error={error.password}
          suffix={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-2 text-[#9E9E9E] hover:text-black transition border-0"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          }
        />
        {type === "register" && (
          <Input
            id="confirmPassword"
            label="Confirm Password"
            placeholder="••••••••"
            type={showConfirmPassword ? "text" : "password"}
            onChange={handleChange}
            value={formData.confirmPassword}
            error={error.confirmPassword}
            suffix={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="p-2 text-[#9E9E9E] hover:text-black transition border-0"
              >
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            }
          />
        )}
      </div>

      <div className="pt-4">
        <Button
          text={type === "login" ? "Enter Portal" : "Create Account"}
          type="submit"
          loading={loading}
        />
      </div>

      <div className="pt-6 text-center">
        <p className="text-sm text-on-surface-variant">
          {type === "login" ? "New here?" : "Already part of our collection?"}{" "}
          <Link
            to={type === "login" ? "/register" : "/login"}
            className="text-primary font-semibold hover:text-secondary underline underline-offset-4 decoration-outline-variant hover:decoration-secondary transition-all"
          >
            {type === "login" ? "Register here" : "Login here"}
          </Link>
        </p>
      </div>
    </form>
  );
};

export default AuthForm;
