"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import Template05 from "../../../../../../features/invoice/components/templates/Template05";
import GoBack from "../../../../../../components/ui/custom/GoBack";
import { StatusBadge } from "../../../../../../components/shared/InvoiceStatusBadge";
import Template01 from "../../../../../../features/invoice/components/templates/Template01";
import Template02 from "../../../../../../features/invoice/components/templates/Template02";
import Template04 from "../../../../../../features/invoice/components/templates/Template04";
import Template03 from "../../../../../../features/invoice/components/templates/Template03";
import {
  useGetInvoice,
  useSendInvoice,
} from "../../../../../../features/invoice/hooks";
import { Button } from "../../../../../../components/ui/button";
import SendInvoiceDialog from "../../../../../../features/invoice/components/SendInvoiceDialog";
import { getDueStatus } from "../../../../../../lib/utils/helpers";
import { InvoiceType } from "../../../../../../types/invoiceTypes";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const [openSendDialog, setOpenSendDialog] = useState(false);

  const id = Array.isArray(params.invoiceId)
    ? params.invoiceId[0]
    : params.invoiceId;

  const { data } = useGetInvoice({ invoice_id: id || "" });
  const invoice: InvoiceType = data;
  console.log(invoice);
  const sendInvoiceMutation = useSendInvoice(id || "");

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

  const handleSendInvoice = ({ emails }: { emails: string[] }) => {
    const recipients = emails;

    // console.log("Sending invoice:", {
    //   invoiceId: invoice?.id,
    //   recipients,
    // });

    // 🔥 call API here
    sendInvoiceMutation.mutate({ emails: recipients });
  };

  return (
    <>
      <div className="pt-5 px-4 sm:px-[30px] lg:px-10 md:max-w-[500px] lg:max-w-[650px] xl:max-w-[800px] mx-auto pb-20 overflow-x-auto">
        <GoBack />

        <div className="mt-5 flex place-selfstart md:mt-10 w-full justify-between items-center">
          <StatusBadge status={invoice?.status || "draft"} variant="filled" />

          <div className="bg-orange-500 text-neutral-500 font-bold text-sm md:text-base px-[15px] py-1 md:px-[26.5px] md:py-1 rounded-[20px]">
            {getDueStatus(invoice?.due_date || "")}
          </div>
        </div>

        <section className="mt-8 flex justify-between">
          <h3>{invoice?.invoice_number}</h3>
        </section>

        <section className="mt-8 px-2 min-w-[270px]">{getTemplate()}</section>

        {invoice?.status === "draft" && (
          <div className="flex gap-[30px] justify-center mt-10 lg:mt-[60px]">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="in-app-btn"
            >
              Close
            </Button>

            <Button
              type="button"
              className="in-app-btn"
              onClick={() => setOpenSendDialog(true)}
            >
              Send
            </Button>
          </div>
        )}
      </div>

      {/* ✅ Send Invoice Dialog */}
      <SendInvoiceDialog
        open={openSendDialog}
        onOpenChange={setOpenSendDialog}
        onSend={handleSendInvoice}
        pending={sendInvoiceMutation.isPending}
      />
    </>
  );
}

// "use client";
// import { useParams, useRouter } from "next/navigation";
// import React from "react";
// import Template05 from "../../../../../../features/invoice/components/templates/Template05";
// import GoBack from "../../../../../../components/ui/custom/GoBack";
// import { StatusBadge } from "../../../../../../components/shared/InvoiceStatusBadge";
// import { FiEdit } from "react-icons/fi";
// import { AiOutlineDelete } from "react-icons/ai";
// import Template01 from "../../../../../../features/invoice/components/templates/Template01";
// import Template02 from "../../../../../../features/invoice/components/templates/Template02";
// import Template04 from "../../../../../../features/invoice/components/templates/Template04";
// import Template03 from "../../../../../../features/invoice/components/templates/Template03";
// import { useGetInvoice } from "../../../../../../features/invoice/hooks";
// import { Button } from "../../../../../../components/ui/button";

// export default function Page() {
//   const router = useRouter();
//   const params = useParams();
//   const id = Array.isArray(params.invoiceId)
//     ? params.invoiceId[0]
//     : params.invoiceId;

//   const { data } = useGetInvoice({ invoice_id: id || "" });
//   const invoice = data;
//   // console.log('data',invoice);

//   const getTemplate = () => {
//     switch (invoice?.template_id) {
//       case "template_002":
//         return <Template02 invoice={invoice} />;
//       case "template_003":
//         return <Template03 invoice={invoice} />;
//       case "template_004":
//         return <Template04 invoice={invoice} />;
//       case "template_005":
//         return <Template05 invoice={invoice} />;
//       default:
//         return <Template01 invoice={invoice} />;
//     }
//   };

//   return (
//     <div className="pt-5 px-4 sm:px-[30px] lg:px-10 md:max-w-[500px]  lg:max-w-[650px] xl:max-w-[800px] mx-auto pb-20 overflow-x-auto">
//       <GoBack />
//       <div className="mt-5 flex place-self-start md:mt-10">
//         <StatusBadge status={invoice?.status || "draft"} variant="filled" />
//       </div>
//       <section className="mt-8 flex justify-between">
//         <h3 className="">{invoice?.invoice_number}</h3>
//         <div className="flex font-medium gap-2.5">
//           <div className="flex items-center gap-1 text-primary-500">
//             <FiEdit className="text-[16px]" />
//             <span className="underline underline-offset-4 text-lg">Edit</span>
//           </div>
//           <div className="flex items-center gap-1 text-error-400">
//             <AiOutlineDelete className="text-[16px]" />
//             <span className="underline underline-offset-4 text-lg">Delete</span>
//           </div>
//         </div>
//       </section>

//       <section className="mt-8 px-2 min-w-[270px]">{getTemplate()}</section>

//       {invoice?.status === "draft" && (
//         <div className="flex max-w-full gap-[30px]  justify-center mt-10 lg:mt-[60px]">
//           <Button
//             onClick={() => router.back()}
//             className="in-app-btn"
//             variant="outline"
//           >
//             Close
//           </Button>
//           <Button
//             type="button"
//             onClick={() => console.log("hish")}
//             className="in-app-btn"
//           >
//             Send
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }

// //Success in house of wonder
