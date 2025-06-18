import React from "react";
import CreateInvoice from "../../../../../components/webapp/forms/CreateInvoice";
import AddItemsModal from "../../../../../components/webapp/modals/AddItemModal";

export default function Page() {
  return (
    <section className="">
      <div className="myContainer">
        <h2 className="section-title mt-5">New Invoice</h2>
        <h4 className="section-subtitle mt-5">Invoice Number</h4>

        <div className="flex gap-[2px] items-center mt-[10px]">
          <div className="bg-[#D9E4F8] rounded-[3px] text-text-strong h-[30px] w-[25px] flex items-center justify-center text-sm font-medium">
            #
          </div>
          <div className=" border border-[#AAAAAA] font-medium text-xs h-[30px] w-full flex items-center px-[10px] py-[6px] rounded-[6px] max-w-[113px]">
            INV-001
          </div>
        </div>
      </div>

      <div className="mt-6">
        <CreateInvoice inv="INV-001" />
      </div>

      <AddItemsModal />
    </section>
  );
}
