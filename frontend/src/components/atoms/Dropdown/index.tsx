import React from "react";

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string | number }[];
  label?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  label,
  className = "",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {label && <label className="text-sm font-medium">{label}</label>}

      <select
        className={`border border-black rounded-lg px-12 py-8 bg-white text-sm dropdown ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
