import React from "react";
import AuthForm from "../../components/molecules/AuthForm";

const Login: React.FC = () => {
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
            onSubmit={(data) => {
              console.log("data", data);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
