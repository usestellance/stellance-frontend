"use client";

import { useState } from "react";
import { Field, Label, Input, Description } from "@headlessui/react";
import { IoEye, IoEyeOff } from "react-icons/io5";

interface InputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string | number;
  readonly?: boolean;
  error?: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  autoComplete?: string;
  disabled?: boolean;
  description?: string;
  className?: string;
}

const InputField: React.FC<InputProps> = ({
  placeholder,
  disabled,
  name,
  readonly,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  min,
  max,
  description,
  className = "input-class",
}) => {
  const [view, setView] = useState(false);

  const handleView = () => {
    setView((prev) => !prev);
  };

  return (
    <Field className="">
      <Label htmlFor={name} className=" label-class">
        {label}
      </Label>
      {description && (
        <Description className="mb-1 text-sm text-gray-500">
          {description}
        </Description>
      )}
      <div className="relative">
        <Input
          id={name}
          name={name}
          type={type === "password" && view ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          readOnly={readonly}
          min={min}
          max={max}
          className={`${className}  
            ${error ? "border-[#B40000E5] text-[#B40000]" : "border-[#AAAAAA] "}
            ${
              readonly
                ? "bg-[#AAAAAA66] dark:bg-[#aaa] dark:text-[#151515] text-[#979797] font-semibold"
                : ""
            }
          `}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={handleView}
            className="absolute right-3 top-[30%] text-[#8F8F8F] text-xl sm:right-4 sm:top-[35%] sm:text-2xl"
          >
            {view ? <IoEyeOff className="" /> : <IoEye className="" />}
          </button>
        )}
      </div>
      {error && (
        <Description className="mt-1 text-xs text-[#b40000]">
          {error}
        </Description>
      )}
    </Field>
  );
};

export default InputField;
