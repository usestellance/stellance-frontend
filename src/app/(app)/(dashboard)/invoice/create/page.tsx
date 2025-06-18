import React from "react";
import CreateInvoice from "../../../../../components/webapp/forms/CreateInvoice";
import AddItemsModal from "../../../../../components/webapp/modals/AddItemModal";
import CreateInvoiceDesktop from "../../../../../components/webapp/forms/CreateInvoiceDesktop";

export default function Page() {
  return (
    <section className="">
      <div className="myContainer">
        <h2 className="section-title mt-5">New Invoice</h2>
        <h4 className="section-subtitle mt-5 md:mt-[30px]">Invoice Number</h4>

        <div className="flex gap-[2px] items-center mt-[10px] md:mt-5">
          <div className="bg-[#D9E4F8] rounded-[3px] text-text-strong h-[30px] w-[25px] md:h-[40px] md:w-[43px] lg:h-[60px] lg:w-[63px]  flex items-center justify-center text-sm font-medium lg:text-xl">
            #
          </div>
          <div className=" border border-[#AAAAAA] font-medium text-xs h-[30px] w-full flex items-center px-[10px] py-[6px] rounded-[6px] max-w-[113px] md:h-[40px] lg:max-w-[248px] lg:h-[60px] lg:text-base lg:px-[22px]">
            INV-001
          </div>
        </div>
      </div>

      <div className="mt-6 max-md:hidden">
        <CreateInvoiceDesktop inv="INV-001" />
      </div>

      <div className="mt-6 md:hidden">
        <CreateInvoice inv="INV-001" />
      </div>

      <AddItemsModal />
    </section>
  );
}
