import React from "react";
import Link from "next/link";
import BtnLoader from "./BtnLoader";

export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  size: "sm" | "lg";
  theme?: "primary" | "secondary" | "tetiary";
  customTheme?: string;
  children: React.ReactNode;
  // Redirect props
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  download?: string;
  // Additional button props
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  id?: string;
  loading?: boolean;
  className?: string;
}

const AppButton: React.FC<ButtonProps> = ({
  type = "button",
  size = "sm",
  theme = "primary",
  customTheme,
  children,
  href,
  target,
  download,
  className,
  disabled,
  onClick,
  loading,
}) => {
  const themeMap = {
    primary: `text-white ${
      disabled
        ? "bg-primary-disabled dark:bg-secondary-disabled"
        : "bg-primary dark:bg-secondary"
    }`,
    secondary: `text-primary bg-white`,
    tetiary: `text-primary border-2 border-primary `,
  };

  const sizeMap = {
    sm: "text-sm px-[18px] font-bold h-[42px] sm:h-[50px] sm:text-base lg:h-[60px] lg:text-lg",
    lg: "text-base px-8 font-medium h-[43px] sm:h-[50px] sm:text-base lg:h-[60px] lg:text-lg lg:font-bold",
  };

  const sizeClasses = sizeMap[size];
  const finalClass =
    `whitespace-nowrap block text-center rounded-[24px] no-underline ${
      disabled
        ? " cursor-not-allowed"
        : "cursor-pointer hover:scale-102 duration-150 active:scale-100"
    } min-w-[119px]  py-3  ${
      !customTheme && themeMap[theme]
    } ${sizeClasses} ${customTheme} ${className || ""}`.trim();

  // If href is provided, render as a link
  if (href) {
    // Check if it's an external link
    const isExternal = href.startsWith("http") || href.startsWith("//");

    if (isExternal) {
      return (
        <a
          href={href}
          target={target}
          download={download}
          className={finalClass}
        >
          {children}
        </a>
      );
    }

    // Use Next.js Link for internal navigation
    return (
      <Link
        href={href}
        target={target}
        download={download}
        className={finalClass}
      >
        {children}
      </Link>
    );
  }

  // Render as button
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={finalClass}
    >
      {loading ? <BtnLoader /> : children}
    </button>
  );
};

export default AppButton;
