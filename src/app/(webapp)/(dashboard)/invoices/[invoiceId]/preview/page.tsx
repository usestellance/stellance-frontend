"use client";
import { useParams } from "next/navigation";
import React from "react";
import Template05 from "../../../../../../features/invoice/components/templates/Template05";
import GoBack from "../../../../../../components/ui/custom/GoBack";
import { StatusBadge } from "../../../../../../components/shared/InvoiceStatusBadge";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Template01 from "../../../../../../features/invoice/components/templates/Template01";
import Template02 from "../../../../../../features/invoice/components/templates/Template02";
import Template04 from "../../../../../../features/invoice/components/templates/Template04";
import Template03 from "../../../../../../features/invoice/components/templates/Template03";
import { useGetInvoice } from "../../../../../../features/invoice/hooks";

export default function Page() {
  const params = useParams();
  const id = Array.isArray(params.invoiceId)
    ? params.invoiceId[0]
    : params.invoiceId;

  const { data } = useGetInvoice({ invoice_id: id || "" });
  const invoice = data;
  // console.log('data',invoice);

  const getTemplate = () => {
    switch (invoice?.template_id) {
      case "template_002":
        return <Template02 invoice={invoice} />;
      case "template_003":
        return <Template03 invoice={invoice} />;
      case "template_004":
        return <Template04 invoice={invoice} />;
      case "template_005":
        return <Template05 invoice={invoice} />;
      default:
        return <Template01 invoice={invoice} />;
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
      {/* <section className="mt-8 px-2">
        <Template05 invoice={invoice} />
      </section> */}
    </div>
  );
}

//Success in house of wonder
