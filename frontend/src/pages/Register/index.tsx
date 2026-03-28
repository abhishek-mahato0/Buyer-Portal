import React from "react";
import AuthForm from "../../components/molecules/AuthForm";
import { useMutation } from "../../hooks/useMutation";
import { registerApi } from "../../api/auth/register.api";
import type { RegisterData } from "../../types/auth.types";
import { setItem } from "../../utils/localstorage";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const register = useMutation(registerApi, {
    onSuccess: (data: any) => {
      setItem("token", data.token);
      setItem("refreshToken", data.refreshToken);
      setItem("user", JSON.stringify(data.user));
      toast.success("Register successfully");
      navigate("/");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Something went wrong");
    },
  });
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="md:w-[50vw] w-[100vw] p-[30px] flex justify-center flex-col">
        <h2 className="size-[24px] md:size-[36px] w-full">
          Architectural Curator
        </h2>
        <div className="border-2 mt-1 border-black w-[40px]" />
        <div className="flex flex-col gap-8 mt-36">
          <h1 className="size-[28px] md:size-[42px]">Begin Your Journey</h1>
          <p className="mb-8 size-[16px] md:size-[18px]">
            Join an exclusive network of architectural connoisseurs and gain
            access to off-market masterpieces.
          </p>
          <AuthForm
            type="register"
            onSubmit={(data) => {
              register.mutate(data as RegisterData);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
