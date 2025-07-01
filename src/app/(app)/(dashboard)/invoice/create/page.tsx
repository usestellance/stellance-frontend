'use client'
import React from "react";
import CreateInvoice from "../../../../../components/webapp/forms/CreateInvoice";
import AddItemsModal from "../../../../../components/webapp/modals/AddItemModal";
import CreateInvoiceDesktop from "../../../../../components/webapp/forms/CreateInvoiceDesktop";
// import GoBack from "../../../../../components/webapp/ui/GoBack";

export default function Page() {
  return (
    <section className="">
      <div className="myContainer">
        {/* <GoBack /> */}
        <h2 className="section-title mt-5">New Invoice</h2>
        {/* <h4 className="section-subtitle mt-5 md:mt-[30px]">Invoice Number</h4> */}

        {/* <div className="flex gap-[2px] items-center mt-[10px] md:mt-5">
          <div className="bg-[#D9E4F8] rounded-[3px] text-text-strong h-[30px] w-[25px] md:h-[40px] md:w-[43px] lg:h-[60px] lg:w-[63px]  flex items-center justify-center text-sm font-medium lg:text-xl">
            #
          </div>
          <div className=" border border[#AAAAAA] font-medium text-xs h-[30px] flex items-center px-[10px] py-[6px] rounded-[6px] min-w-[100px] md:h-[40px] lg:min-w-[150px] bg-[#D9E4F8] text-text-strong lg:h-[60px] lg:text-base lg:px-[22px]">
            INV-001
          </div>
        </div> */}
      </div>

      <div className="mt-6 max-md:hidden">
        <CreateInvoiceDesktop  />
      </div>

      <div className="mt-6 md:hidden">
        <CreateInvoice />
      </div>

      <AddItemsModal />
    </section>
  );
}
