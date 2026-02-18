import React, { FC } from "react";
import TransactionCards from "./TransactionCards";
import { ITransaction } from "../../../types/transactionTypes";
import { useGetInvoices } from "../../invoice/hooks";
import { InvoiceType } from "../../../types/invoiceTypes";
import InvoicePagination from "../../invoice/components/InvoicePagination";

const RecentTransactions = () => {
  const { data, isLoading, isError, error } = useGetInvoices({ paid: true });
  const invoices = data?.invoice || [];
  // const invoiceMeta = data?.meta;
  const totalPages = data?.meta?.total_pages || 1;

  // console.log(invoices);

  return (
    <div className="">
      <h5 className="text-sm font-medium lg:text-2xl">Recent Payments</h5>
      <p className="text-center mt-20 text-xl lg:mt-32 lg:text-4xl animate-pulse">
        Coming soon...
      </p>
    </div>
    // <div>
    //   <h5 className="text-sm font-medium lg:text-2xl">Recent Payments</h5>

    //   {invoices?.length === 0 && (
    //     <div className="text-center mt-20 lg:text-xl">
    //       No Recent Transactions
    //     </div>
    //   )}

    //   <div className="space-y-[15px] mt-2.5 lg:mt-7">
    //     {invoices?.map((transaction: InvoiceType) => (
    //       <TransactionCards key={transaction.id} {...transaction} />
    //     ))}
    //   </div>

    //   {totalPages > 1 && (
    //     <div className="mt-10 lg:mt-[60px]">
    //       <InvoicePagination pageNumber={totalPages || 1} />
    //     </div>
    //   )}
    // </div>
  );
};

export default RecentTransactions;
