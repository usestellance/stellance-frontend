import React from "react";
import { InvoiceType } from "../../lib/types/invoiceType";
import {
  capitalizeWords,
  formatCurrency,
} from "../../utils/helpers/helperFunctions";
import { previewInvoiceRoute } from "../../utils/route";
import { useRouter } from "next/navigation";

const getStatusBadge = (status: string) => {
  const statusStyles = {
    Paid: "text-[#004E31] border-[#007A4D] bg-[#007A4D]/20",
    Sent:
      "border-[#FFCE74] bg-[#FFCE74]/20 text-[#885800] dark:text-[#FFC75F] ",
    Overdue: "text-[#910400] border-[#D31510] bg-[#D31510]/15",
    Draft: "bg-[#508DFA]/15 text-[#508DFA] border-[#508DFA]",
    Cancelled: "text-[#800000] border-[#800000] bg-[#800000]/15",
    Viewed: "text-[#004E31] border-[#00FF55] bg-[#00FF55]/15",
  };

  return (
    <span
      className={`h-8 w-[75px] border mx-auto rounded-[3px] text-sm flex justify-center items-center font-medium ${
        statusStyles[status as keyof typeof statusStyles] || statusStyles.Draft
      }`}
    >
      {(status === "Viewed" && capitalizeWords("Approved")) ||
        (status === "Cancelled" && capitalizeWords("Declined")) ||
        (status === "Sent" && capitalizeWords("Pending")) ||
        capitalizeWords(status)}
    </span>
  );
};

const InvoiceListDesktop: React.FC<InvoiceType> = (invoice) => {
  const router = useRouter();

  const previewInvoice = () => {
    router.push(previewInvoiceRoute(invoice.id || ""));
  };
console.log(invoice);
  return (
    <tr
      onClick={previewInvoice}
      className="bg-[#D9E4F866] font-medium cursor-pointer max-xl:hidden hover:bg-primary hover:text-white dark:hover:bg-secondary/50 duration-200"
    >
      <td className="px-4 py-5 whitespace-nowrap text-xs">
        {invoice.invoice_number}
      </td>
      <td className="px-4 py-5">
        <div className="text-sm">
          <div className="font-medium text-center">{invoice.payer_name}</div>
          <div className="text-center">{invoice.payer_email}</div>
        </div>
      </td>
      <td className="px-4 py-5 text-sm max-w-xs text-center truncate">
        {invoice.title}
      </td>
      <td className="px-4 py-5 text-center text-sm ">
        {new Date(invoice.created_at || "").toLocaleDateString()}
      </td>
      <td className="px-4 py-5 text-center text-sm ">
        {new Date(invoice.due_date || "").toLocaleDateString()}
      </td>
      <td className="px-4 py-5 text-sm text-center ">
        {formatCurrency(invoice.total || 0)}
      </td>
      <td className="px-2">
        {getStatusBadge(capitalizeWords(invoice.status || ""))}
        {/* {getStatusBadge(capitalizeWords("cancelled") || "")} */}
      </td>
    </tr>
  );
};

export default InvoiceListDesktop;

export const InvoiceListDesktopSkeleton: React.FC = () => {
  return (
    <tr className="bg-[#D9E4F866] font-medium duration-150 max-xl:hidden animate-pulse">
      {/* Invoice Number */}
      <td className="px-4 py-5">
        <div className="h-4 bg-gray-300 rounded w-20"></div>
      </td>

      {/* Payer Info */}
      <td className="px-4 py-5">
        <div className="text-sm space-y-2">
          <div className="h-4 bg-gray-300 rounded w-24 mx-auto"></div>
          <div className="h-3 bg-gray-300 rounded w-32 mx-auto"></div>
        </div>
      </td>

      {/* Country */}
      <td className="px-4 py-5 text-center">
        <div className="h-4 bg-gray-300 rounded w-16 mx-auto"></div>
      </td>

      {/* Date Issued */}
      <td className="px-4 py-5 text-center">
        <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
      </td>

      {/* Due Date */}
      <td className="px-4 py-5 text-center">
        <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
      </td>

      {/* Amount */}
      <td className="px-4 py-5 text-center">
        <div className="h-4 bg-gray-300 rounded w-16 mx-auto"></div>
      </td>

      {/* Status Badge */}
      <td className="px-4 py-5">
        <div className="h-7 w-[59px] bg-gray-300 rounded-[3px] mx-auto"></div>
      </td>
    </tr>
  );
};
