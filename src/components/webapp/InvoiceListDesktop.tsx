import React from "react";

interface Invoice {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  description: string;
  dateIssued: string;
  dueDate: string;
  amount: number;
  status: string;
}

interface InvoiceListProps {
  invoice?: Invoice;
}

const InvoiceListDesktop: React.FC<InvoiceListProps> = ({ invoice }) => {
  const sampleInvoice = invoice || {
    id: "INV-001",
    customer: {
      name: "John Doe",
      email: "john@example.com",
    },
    description: "Web Development Services",
    dateIssued: "2024-01-15",
    dueDate: "2024-02-15",
    amount: 2500.0,
    status: "Pending",
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      Paid: "text-[#004E31] border-[#007A4D] bg-[#007A4D]/20",
      Pending:
        "border-[#FFCE74] bg-[#FFCE74]/20 text-[#885800] dark:text-[#FFC75F] ",
      Overdue: "text-[#910400] border-[#D31510] bg-[#D31510]/15",
      Draft: "bg-gray-100 text-gray-800 border-gray-200",
    };

    return (
      <span
        className={`h-7 w-[59px] border mx-auto rounded-[3px] text-xs flex justify-center items-center font-medium ${
          statusStyles[status as keyof typeof statusStyles] ||
          statusStyles.Draft
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <tr className="bg-[#D9E4F866] font-medium duration-150 max-xl:hidden">
      <td className="px-4 py-5">{sampleInvoice.id}</td>
      <td className="px-4 py-5">
        <div className="text-sm">
          <div className="font-medium text-center">
            {sampleInvoice.customer.name}
          </div>
          <div className="text-center">{sampleInvoice.customer.email}</div>
        </div>
      </td>
      <td className="px-4 py-5 text-sm max-w-xs text-center truncate">
        {sampleInvoice.description}
      </td>
      <td className="px-4 py-5 text-center text-sm ">
        {new Date(sampleInvoice.dateIssued).toLocaleDateString()}
      </td>
      <td className="px-4 py-5 text-center text-sm ">
        {new Date(sampleInvoice.dueDate).toLocaleDateString()}
      </td>
      <td className="px-4 py-5 text-sm text-center ">
        $
        {sampleInvoice.amount.toLocaleString("en-US", {
          minimumFractionDigits: 2,
        })}
      </td>
      <td className="">{getStatusBadge(sampleInvoice.status)}</td>
    </tr>
  );
};

export default InvoiceListDesktop;
