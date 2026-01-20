import React from "react";
import InvoiceCard from "../../../components/shared/MobileInvoiceList";
import InvoiceFilter from "./InvoiceFilter";
// import { mockInvoices } from "../../overview/components/LatestInvoices";
import { DataTable } from "../../../components/shared/DesktopInvoiceList/data-table";
import { columns } from "../../../components/shared/DesktopInvoiceList/columns";
import { useInvoiceFilter } from "../../../store/useInvoiceStore";
import InvoicePagination from "./InvoicePagination";
import Image from "next/image";
import { useGetInvoices } from "../hooks";
import { InvoiceType } from "../../../types/invoiceTypes";

const Invoices = () => {
  const { searchTerm, status } = useInvoiceFilter();
  const { data, isLoading, isError, error } = useGetInvoices({ status });
  const invoices = data?.invoice || [];
  const invoiceMeta = data?.meta;
  const totalPages = data?.meta?.total_pages || 1;

  // console.log("Fetched Invoices:", data?.invoice);
  // console.log("Fetched Invoices:", invoiceMeta);

  // const filteredData = mockInvoices.filter((inv) => {
  //   const matchesSearch =
  //     !searchTerm ||
  //     inv.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     inv.payer_name?.toLowerCase().includes(searchTerm.toLowerCase());

  //   const matchesStatus =
  //     status === "all" || inv.status?.toLowerCase() === status.toLowerCase();

  //   return matchesSearch && matchesStatus;
  // });

  const isEmpty = invoices?.length === 0;

  if (isLoading) {
    return <div className="text-center mt-20">Loading invoices...</div>;
  }

  if (isError) {
    return <div className="text-center mt-20">Error loading invoices</div>;
  }

  return (
    <div>
      <InvoiceFilter />

      <div className="mt-[30px]">
        {!isEmpty ? (
          <>
            {/* MOBILE LIST */}
            <div className="space-y-[15px] xl:hidden">
              {invoices?.map((inv: InvoiceType) => (
                <InvoiceCard key={inv.id} invoice={inv} />
              ))}
            </div>

            {/* DESKTOP TABLE */}
            <div className="max-xl:hidden overflow-x-auto">
              {/* <DataTable data={filteredData} columns={columns} /> */}
              <DataTable data={invoices} columns={columns} />
            </div>

            {totalPages > 1 && (
              <div className="mt-10 lg:mt-[60px]">
                <InvoicePagination pageNumber={totalPages || 1} />
              </div>
            )}
          </>
        ) : (
          // EMPTY UI
          <div className="mt-14 flex flex-col items-center gap-8 md:mt-20 lg:mt-24 max-w-[163px] mx-auto">
            <Image
              src="/images/no-Invoice-svg.svg"
              alt="No Invoice"
              height={200}
              width={200}
              className="w-full h-full object-contain"
            />
            <p className="text-center text-sm font-light md:text-xl">
              {!searchTerm && status === "all" && data?.invoice.length === 0
                ? "You have not created any invoice yet. All created invoices would be displayed here."
                : "No Invoice Found."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoices;
