import React from "react";
import InvoiceCard from "../../../components/shared/MobileInvoiceList";
import InvoiceFilter from "./InvoiceFilter";
import { mockInvoices } from "../../dashboard/components/LatestInvoices";
import { DataTable } from "../../../components/shared/DesktopInvoiceList/data-table";
import { columns } from "../../../components/shared/DesktopInvoiceList/columns";
import { useInvoiceFilter } from "../../../store/useInvoiceStore";
import InvoicePagination from "./InvoicePagination";
import Image from "next/image";

const Invoices = () => {
  const { searchTerm, status } = useInvoiceFilter();

  const filteredData = mockInvoices.filter((inv) => {
    // MATCH BY SEARCH TERM (invoice number or client/payer name)
    const matchesSearch =
      searchTerm.trim() === "" ||
      inv.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.payer_name?.toLowerCase().includes(searchTerm.toLowerCase());

    // MATCH BY STATUS
    const matchesStatus =
      status === "all" || inv.status?.toLowerCase() === status.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <InvoiceFilter />

      <div className="mt-[30px]">
        {filteredData?.length > 0 ? (
          <>
            <div className="space-y-[15px] xl:hidden">
              {filteredData.map((inv) => (
                <InvoiceCard key={inv.id} invoice={inv} />
              ))}
            </div>

            <div className="max-xl:hidden overflow-x-auto">
              <DataTable data={filteredData} columns={columns} />
            </div>

            <div className="mt-10 lg:mt-[60px]">
              <InvoicePagination />
            </div>
          </>
        ) : (
          <div className="mt-14 flex flex-col items-center gap-8 md:mt-20 lg:mt-24 ">
            <div className="">
              <Image
                src="/images/no-Invoice-svg.svg"
                alt="No Invoice"
                height={200}
                width={200}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="md:w-1/2 text-center text-sm font-light md:text-xl">
              {!searchTerm && status === "all"
                ? "You have not created  any invoice yet. All created  invoices would be displayed here."
                : "No Invoice Found."}
            </p>
          </div>
        )}

        {filteredData.length < 0 && (
          <>
            <div className="max-xl:hidden overflow-x-auto">
              <DataTable data={filteredData} columns={columns} />
            </div>

            <div className="mt-10 lg:mt-[60px]">
              <InvoicePagination />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Invoices;
