import React from "react";

const InvoiceList = () => {
  return (
    <>
      <div className="flex justify-between items-center bg-[#D9E4F866] rounded-[5px] px-[15px] py-3 xl:hidden">
        <div className="flex flex-col gap-[5px]">
          <p className="text-xs leading-[25px]">INV-001</p>
          <div className="h-7 w-[59px] border rounded-[3px] text-xs flex justify-center items-center font-medium border-[#FFCE74] text-[#885800] dark:text-[#FFC75F]">
            Pending
          </div>
        </div>
        <div className="text-end text-sm">
          <p>To:</p>
          <p className="font-bold">Janet John</p>
          <p className="font-bold">$1,000.00</p>
          <p>Due Date: 15-06-2025</p>
        </div>
      </div>
    </>
  );
};

export default InvoiceList;
