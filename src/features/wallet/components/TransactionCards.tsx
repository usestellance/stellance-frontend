import { LucideArrowDownToLine, LucideArrowUpToLine } from "lucide-react";
import React, { FC } from "react";
import { ITransaction } from "../../../types/transactionTypes";

const TransactionCards: FC<ITransaction> = (transaction) => {
  const { type, amount } = transaction;

//   console.log(transaction);
  return (
    <div className="bg-primary-20 rounded-[5px] lg:rounded-[10px] py-[13px] pl-2.5 pr-5 flex items-center justify-between lg:py-5 lg:px-7">
      <div className="flex gap-2.5">
        <div
          className={`${
            type === "sent" ? "bg-error-400" : "bg-success-500"
          } min-h-10 min-w-10 h-fit w-fit lg:min-w-[52px] lg:min-h-[52px] rounded-full flex justify-center items-center text-white`}
        >
          {type === "sent" ? (
            <LucideArrowUpToLine className="text-[17px]" />
          ) : (
            <LucideArrowDownToLine className="text-[17px]" />
          )}
        </div>
        <div className="flex flex-col justify-between">
          <h5 className="text-sm font-bold lg:text-xl">
            {type === "sent" ? "Sent" : "Received"}
          </h5>
          <p className="text-xs text-neutral-900 lg:text-base">
            To gdsdXXXXXXdsdvd
          </p>
        </div>
      </div>
      <div
        className={`${
          type === "sent" ? "text-error-500" : "text-success-500"
        } font-bold text-sm lg:text-2xl`}
      >{`${type === "sent" ? "-" : "+"}$${amount}`}</div>
    </div>
  );
};

export default TransactionCards;
