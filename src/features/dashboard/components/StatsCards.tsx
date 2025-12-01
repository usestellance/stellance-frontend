import React from "react";

const Card = () => {
  return (
    <div className="h-[110px] sm:h-[140px] w-full border-[0.5px] border-primary-500/30 bg-neutral-500 rounded-[5px] shadow-lg px-2.5 py-3 flex flex-col gap-2.5 sm:justify-between sm:py-5 sm:rounded-[10px] sm:px-3">
      <h6 className="text-[10px] sm:text-sm">TOTAL</h6>
      <p className="line-clamp-1 font-medium text-xl sm:text-[26px] text-primary-500">
        $123,490
      </p>
      <div className="rounded-[20px] bg-primary-50 text-[10px] sm:text-xs font-medium w-fit py-0.5 px-3 ">
        134 invoices
      </div>
    </div>
  );
};

export const StatsCards = () => {
  return (
    <div className="custom-container grid grid-cols-2 gap-y-5 gap-x-2.5 lg:grid-cols-4">
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};
