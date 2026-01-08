"use client";
import { useParams } from "next/navigation";
import React from "react";
import Template05 from "../../../../../../features/invoice/components/templates/Template05";
import GoBack from "../../../../../../components/ui/custom/GoBack";
import { StatusBadge } from "../../../../../../components/shared/InvoiceStatusBadge";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { invoiceItems } from "../../../../../../lib/utils";
import { mockInvoices } from "../../../../../../features/dashboard/components/LatestInvoices";
import Template01 from "../../../../../../features/invoice/components/templates/Template01";
import Template02 from "../../../../../../features/invoice/components/templates/Template02";
import Template04 from "../../../../../../features/invoice/components/templates/Template04";
import Template03 from "../../../../../../features/invoice/components/templates/Template03";

export default function Page() {
  const params = useParams();
  const id = params.invoiceId;
  const invoice = mockInvoices.find((inv) => inv.id === id);
  // console.log(invoice);

  const getTemplate = () => {
    switch (invoice?.templateId) {
      case "template_002":
        return <Template02 />;
      case "template_003":
        return <Template03 />;
      case "template_004":
        return <Template04 />;
      case "template_005":
        return <Template05 />;
      default:
        return <Template01 />;
    }
  };

  return (
    <div className="pt-5 px-4 sm:px-[30px] lg:px-10 md:max-w-[500px]  lg:max-w-[650px] xl:max-w-[800px] mx-auto pb-20">
      <GoBack />
      <div className="mt-5 flex place-self-start md:mt-10">
        <StatusBadge status={invoice?.status || "draft"} variant="filled" />
      </div>
      <section className="mt-8 flex justify-between">
        <h3 className="">{invoice?.invoice_number}</h3>
        <div className="flex font-medium gap-2.5">
          <div className="flex items-center gap-1 text-primary-500">
            <FiEdit className="text-[16px]" />
            <span className="underline underline-offset-4 text-lg">Edit</span>
          </div>
          <div className="flex items-center gap-1 text-error-400">
            <AiOutlineDelete className="text-[16px]" />
            <span className="underline underline-offset-4 text-lg">Delete</span>
          </div>
        </div>
      </section>

      <section className="mt-8 px-2">{getTemplate()}</section>
    </div>
  );
}
