import React, { FC } from "react";
import TransactionCards from "./TransactionCards";
import { ITransaction } from "../../../types/transactionTypes";

const transactions: ITransaction[] = [
  {
    id: 1,
    type: "sent",
    amount: 100,
    currency: "USDC",
    date: "2023-05-15",
    status: "completed",
  },
  {
    id: 2,
    type: "received",
    amount: 200,
    currency: "XLM",
    date: "2023-05-14",
    status: "completed",
  },
  {
    id: 3,
    type: "sent",
    amount: 50,
    currency: "USDC",
    date: "2023-05-13",
    status: "completed",
  },
  {
    id: 4,
    type: "received",
    amount: 75,
    currency: "XLM",
    date: "2023-05-12",
    status: "completed",
  },
];

const RecentTransactions = () => {
  return (
    <div>
      <h5 className="text-sm font-medium lg:text-2xl">Recent Transactions</h5>

      <div className="space-y-[15px] mt-2.5 lg:mt-7">
        {transactions.map((transaction: ITransaction) => (
          <TransactionCards key={transaction.id} {...transaction} />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
