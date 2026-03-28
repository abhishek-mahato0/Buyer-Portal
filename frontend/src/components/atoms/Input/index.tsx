import React from "react";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  onChange,
  value,
  error,
}) => {
  return (
    <div className="flex flex-col gap-3 mb-24">
      <label
        htmlFor={id}
        className="block font-label size-[16px] md:size-[18px] ml-1"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={
          "w-full size-[16px] md:size-[18px] pl-2 pt-6 pb-4 " +
          (error ? "error" : "")
        }
      />
      {error && <p className="text-red size-[12px]">{error}</p>}
    </div>
  );
};

export default Input;
