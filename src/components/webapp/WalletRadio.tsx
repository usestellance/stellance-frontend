import React from "react";
import { useVariableStore } from "../../store/variables";

const WalletRadio = () => {
  const { wallet, setWallet } = useVariableStore();

  const toggleWallet = () => {
    setWallet(wallet === "usdc" ? "xml" : "usdc");
  };

  return (
    <div
      onClick={toggleWallet}
      className="relative text-white px-[10px] flex justify-between text-xs items-center h-[26px] bg-primary w-fit rounded-[30px] font-medium cursor-pointer select-none dark:text-primary dark:bg-white gap-5"
    >
      <span className="">USDC</span>
      <span>XLM</span>

      <div
        className={`absolute top-[1px] bottom-[1.5px] w-1/2 bg-white dark:bg-primary rounded-[30px] text-primary dark:text-white flex justify-center items-center transition-all duration-300 ${
          wallet === "usdc" ? "left-[2px] translate-x-0 " : "translate-x-[76%]"
        }`}
      >
        {wallet.toUpperCase()}
      </div>
    </div>
  );
};

export default WalletRadio;
