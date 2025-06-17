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

const InvoiceList: React.FC<InvoiceListProps> = ({ invoice }) => {
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
      Paid: "text-[#004E31] border-[#007A4D]",
      Pending: "border-[#FFCE74] text-[#885800] dark:text-[#FFC75F] ",
      Overdue: "text-[#910400] border-[#D31510]",
      Draft: "bg-gray-100 text-gray-800 border-gray-200",
    };

    return (
      <span
        className={`h-7 w-[59px] border rounded-[3px] text-xs flex justify-center items-center font-medium ${
          statusStyles[status as keyof typeof statusStyles] ||
          statusStyles.Draft
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <>
      <div className="flex justify-between items-center bg-[#D9E4F866] rounded-[5px] px-[15px] py-3 xl:hidden">
        <div className="flex flex-col gap-[5px]">
          <p className="text-xs leading-[25px]">{sampleInvoice.id}</p>
          <div className="">{getStatusBadge(sampleInvoice.status)}</div>
        </div>
        <div className="text-end text-sm">
          <p>To:</p>
          <p className="font-bold"> {sampleInvoice.customer.name}</p>
          <p className="font-bold">$1,000.00</p>
          <p>
            Due Date: {new Date(sampleInvoice.dueDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* table */}
      <tr className="border-b bg-[#D9E4F866] transition-colors duration-150 max-xl:hidden">
        <td className="px-4 py-4 text-sm font-medium">{sampleInvoice.id}</td>
        <td className="px-4 py-4">
          <div className="text-sm">
            <div className="font-medium text-center">
              {sampleInvoice.customer.name}
            </div>
            <div className="">{sampleInvoice.customer.email}</div>
          </div>
        </td>
        <td className="px-4 py-4 text-sm max-w-xs truncate">
          {sampleInvoice.description}
        </td>
        <td className="px-4 py-4 text-sm ">
          {new Date(sampleInvoice.dateIssued).toLocaleDateString()}
        </td>
        <td className="px-4 py-4 text-sm ">
          {new Date(sampleInvoice.dueDate).toLocaleDateString()}
        </td>
        <td className="px-4 py-4 text-sm font-medium ">
          $
          {sampleInvoice.amount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}
        </td>
        <td className="">{getStatusBadge(sampleInvoice.status)}</td>
      </tr>
    </>
  );
};

export default InvoiceList;
