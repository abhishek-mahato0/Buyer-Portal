import React from "react";

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  type = "button",
  className,
  onClick,
  loading = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w  -full bg-black size-[16px] md:size-[18px] text-white py-16 px-32 rounded-[20px] font-semibold hover:bg-gray-800 transition-all active:scale-[0.98] ${className}`}
    >
      {loading ? <div className="loader"></div> : text}
    </button>
  );
};

export default Button;
