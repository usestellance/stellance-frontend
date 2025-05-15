import React, { FC } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  style: "primary" | "secondary" | "tertiary";
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  style,
  type,
  className = "py-3 px-8",
  disabled,
  onClick,
  loading,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${className} font-medium rounded-[34px] text-[18px] cursor-pointer hover:scale-[1.05] active:scale-[0.99] duration-150 ${
        style === "primary" && "bg-primary text-text-white"
      } ${style === "secondary" && "bg-secondary text-text-white"} ${
        style === "tertiary" && "bg-white text-primary"
      }`}
    >
      {loading ? "loading" : children}
    </button>
  );
};

export default Button;
