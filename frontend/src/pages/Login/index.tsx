import React from "react";
import AuthForm from "../../components/molecules/AuthForm";
import { loginApi } from "../../api/auth/login.api";
import { setItem } from "../../utils/localstorage";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useMutation } from "../../hooks/useMutation";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { mutate, loading } = useMutation(loginApi, {
    onSuccess: (data) => {
      if (data.success) {
        const { accessToken, refreshToken, user } = data.data;
        setItem("token", accessToken);
        setItem("refreshToken", refreshToken);
        setItem("user", JSON.stringify(user));
        toast.success("Login successful!");
        navigate(from, { replace: true });
      }
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
          <h1 className="size-[28px] md:size-[42px]">Welcome Back</h1>
          <p className="mb-8 size-[16px] md:size-[18px]">
            Enter your credentials to access your dashboard.
          </p>
          <AuthForm
            type="login"
            onSubmit={(data) => mutate(data)}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
