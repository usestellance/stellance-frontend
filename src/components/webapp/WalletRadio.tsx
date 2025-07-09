import React from "react";
import { useVariableStore } from "../../store/variables";

const WalletRadio = () => {
  const { wallet, setWallet } = useVariableStore();

  const toggleWallet = () => {
    setWallet(wallet === "$" ? "XML" : "$");
  };

  return (
    <div
      onClick={toggleWallet}
      className="relative text-white px-[10px] flex justify-between text-xs items-center h-[26px] bg-primary w-[78px] rounded-[30px] font-medium cursor-pointer select-none"
    >
      <span>$</span>
      <span>XLM</span>

      <div
        className={`absolute top-[1px] bottom-[1px] w-1/2 bg-white rounded-[30px] text-primary flex justify-center items-center transition-all duration-300 ${
          wallet === "$"
            ? "left-[1px] translate-x-0 "
            : "translate-x-[72%] right[1px]"
        }`}
      >
        {wallet}
      </div>
    </div>
  );
};

export default WalletRadio;
