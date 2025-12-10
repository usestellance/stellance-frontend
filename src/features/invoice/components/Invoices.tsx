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
    const matchesSearch =
      !searchTerm ||
      inv.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.payer_name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      status === "all" || inv.status?.toLowerCase() === status.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const isEmpty = filteredData.length === 0;

  return (
    <div>
      <InvoiceFilter />

      <div className="mt-[30px]">
        {!isEmpty ? (
          <>
            {/* MOBILE LIST */}
            <div className="space-y-[15px] xl:hidden">
              {filteredData.map((inv) => (
                <InvoiceCard key={inv.id} invoice={inv} />
              ))}
            </div>

            {/* DESKTOP TABLE */}
            <div className="max-xl:hidden overflow-x-auto">
              <DataTable data={filteredData} columns={columns} />
            </div>

            <div className="mt-10 lg:mt-[60px]">
              <InvoicePagination />
            </div>
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
              {!searchTerm && status === "all"
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
