import React from "react";
import { InvoiceType } from "../../lib/types/invoiceType";
import {
  capitalizeWords,
  formatCurrency,
} from "../../utils/helpers/helperFunctions";
import { useRouter } from "next/navigation";
import { previewInvoiceRoute } from "../../utils/route";

const getStatusBadge = (status: string) => {
  const statusStyles = {
    Paid: "text-[#004E31] border-[#007A4D] bg-[#007A4D]/20",
    Pending:
      "border-[#FFCE74] bg-[#FFCE74]/20 text-[#885800] dark:text-[#FFC75F] ",
    Overdue: "text-[#910400] border-[#D31510] bg-[#D31510]/15",
    Draft: "bg-[#508DFA]/15 text-[#508DFA] border-[#508DFA]",
    Cancelled: "text-[#800000] border-[#800000] bg-[#800000]/15",
    Viewed: "text-[#00FF40] border-[#00FF55] bg-[#00FF55]/15",
  };
  // console.log(invoice);

  return (
    <span
      className={`h-7 w-fit px-1 min-w-[59px] border rounded-[3px] text-xs flex justify-center items-center font-medium ${
        statusStyles[status as keyof typeof statusStyles] || statusStyles.Draft
      }`}
    >
      {(status === "Viewed" && capitalizeWords("Approved")) ||
        (status === "Cancelled" && capitalizeWords("Declined")) ||
        capitalizeWords(status)}
    </span>
  );
};

const InvoiceList: React.FC<InvoiceType> = (invoice) => {
  const router = useRouter();

  const previewInvoice = () => {
    router.push(previewInvoiceRoute(invoice.id || ""));
  };

  return (
    <div
      onClick={previewInvoice}
      className="flex cursor-pointer justify-between items-center bg-[#D9E4F866] hover:bg-primary hover:text-white dark:hover:bg-secondary/50 duration-200 rounded-[5px] px-[15px] py-3 xl:hidden"
    >
      <div className="flex flex-col gap-4 justify-between">
        <p className="text-xs leading-[25px]">{invoice.invoice_number}</p>
        <div className="">
          {getStatusBadge(capitalizeWords(invoice.status || "") || "")}
          {/* {getStatusBadge(capitalizeWords("viewed") || "")} */}
        </div>
      </div>
      <div className="text-end text-sm">
        <p>To:</p>
        <p className="font-bold"> {invoice.payer_name}</p>
        <p className="font-bold">{formatCurrency(invoice.total || 0)}</p>
        <p>Due Date: {new Date(invoice.due_date || "").toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default InvoiceList;

export const MobileInvoiceSkeleton = () => {
  return (
    <div className="flex justify-between items-center bg-[#D9E4F866] rounded-[5px] px-[15px] py-3 animate-pulse xl:hidden">
      <div className="flex flex-col gap-4 justify-between">
        <div className="h-3 w-24 bg-gray-300 rounded"></div>
        <div className="h-5 w-16 bg-gray-300 rounded"></div>
      </div>
      <div className="flex flex-col gap-1 items-end text-end">
        <div className="h-3 w-10 bg-gray-300 rounded"></div>
        <div className="h-4 w-24 bg-gray-300 rounded"></div>
        <div className="h-4 w-16 bg-gray-300 rounded"></div>
        <div className="h-3 w-20 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};
