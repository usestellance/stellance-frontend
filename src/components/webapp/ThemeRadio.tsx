import React from "react";
import { useVariableStore } from "../../store/variables";
import { CiDark, CiLight } from "react-icons/ci";

const ThemeRadio = () => {
  const { theme, setTheme } = useVariableStore();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      onClick={toggleTheme}
      className="relative text-white px-[10px] flex justify-between text-xs items-center h-[26px] bg-primary w-[78px] rounded-[30px] font-medium cursor-pointer select-none dark:text-primary dark:bg-white scale-80 md:scale-100"
    >
      <span className="pl-1">
        <CiLight className="text-base md:text-lg" />
      </span>
      <span>
        <CiDark className="text-base md:text-lg" />
      </span>

      <div
        className={`absolute top-[1.5px] bottom-[1.5px] w-1/2 bg-white dark:bg-primary rounded-[30px] text-primary dark:text-white flex justify-center items-center transition-all duration-300 ${
          theme === "light"
            ? "left-[1.5px] md:left-[2px] translate-x-0 "
            : "translate-x-[70%]"
        }`}
      >
        {theme === "light" ? (
          <CiLight className="text-base md:text-lg" />
        ) : (
          <CiDark className="text-base" />
        )}
      </div>
    </div>
  );
};

export default ThemeRadio;
