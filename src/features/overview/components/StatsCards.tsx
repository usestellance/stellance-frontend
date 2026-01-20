import React from "react";
import { useGetTransactionStats } from "../hooks";

const Card = ({
  title,
  amount,
  count,
}: {
  title: string;
  amount: string;
  count: string;
}) => {
  return (
    <div className="h-[110px] sm:h-[140px] w-full border-[0.5px] border-primary-500/15 bg-neutral-500 rounded-[5px] shadow-lg shadow-[#8392cd]/30 px-2.5 py-3 flex flex-col gap-2.5 sm:justify-between sm:py-5 sm:rounded-[10px] sm:px-3 hover:-translate-y-1 duration-150">
      <h6 className="text-[10px] sm:text-sm">{title.toUpperCase()}</h6>
      <p className="line-clamp-1 font-medium text-xl sm:text-[26px] text-primary-500">
        {amount}
      </p>
      <div className="rounded-[20px] bg-primary-50 text-[10px] sm:text-xs font-medium w-fit py-0.5 px-3 ">
        {count} invoices
      </div>
    </div>
  );
};

export const StatsCards = () => {
  const { data } = useGetTransactionStats();

  console.log("Stats Cards Data:", data?.total_amount?.amount);

  return (
    <div className="custom-container grid grid-cols-2 gap-y-5 gap-x-2.5 lg:grid-cols-4 xl:gap-6">
      <Card
        title="Total"
        amount={data?.total_amount?.amount || 0}
        count={data?.total_amount?.invoice_count || 0}
      />
      <Card
        title="Paid"
        amount={data?.paid_amount?.amount || 0}
        count={data?.paid_amount?.invoice_count || 0}
      />
      <Card
        title="Pending"
        amount={data?.unpaid_amount?.amount || 0}
        count={data?.unpaid_amount?.invoice_count || 0}
      />
      <Card
        title="Overdue"
        amount={data?.overdue_amount?.amount || 0}
        count={data?.overdue_amount?.invoice_count || 0}
      />
    </div>
  );
};
