import React from "react";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  error?: string;
  suffix?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  onChange,
  value,
  error,
  suffix,
}) => {
  return (
    <div className="flex flex-col gap-3 mb-24">
      <label
        htmlFor={id}
        className="block font-label size-[16px] md:size-[18px] ml-1"
      >
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className={
            "w-full size-[16px] md:size-[18px] pl-2 pt-6 pb-4 pr-10 " +
            (error ? "error" : "")
          }
        />
        {suffix && <div className="absolute right-0 bottom-4">{suffix}</div>}
      </div>
      {error && <p className="text-red size-[12px]">{error}</p>}
    </div>
  );
};

export default Input;
