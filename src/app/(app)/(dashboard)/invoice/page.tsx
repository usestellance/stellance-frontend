import Image from "next/image";
import React from "react";
import AppButton from "../../../../components/webapp/ui/AppButton";
import { createInvoiceRoute } from "../../../../utils/route";

const CreateInvoice = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[163px] lg:w-[200px] mx-auto mt-[80px] lg:mt-[50px]">
        <Image
          alt="Invoice Illustration"
          src="/images/new_Invoice.svg"
          className="h-full w-full object-contain"
          height={500}
          width={500}
        />
      </div>
      <p className="max-w-[294px] lg:max-w-[482px] mx-auto text-center lg:text-xl font-bold mt-4 lg:mt-6">
        You have not created any invoice yet. <br /> All created invoices would
        be displayed here.
      </p>
      <AppButton
        size="lg"
        href={createInvoiceRoute}
        className="w-full mt-7 lg:mt-8 max-w-[320px] sm:max-w-[400px] lg:max-w-[490px]"
      >
        Create Invoice
      </AppButton>
    </div>
  );
};

export default function Page() {
  return (
    <div className="myContainer">
      <CreateInvoice />
    </div>
  );
}
