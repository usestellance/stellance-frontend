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
