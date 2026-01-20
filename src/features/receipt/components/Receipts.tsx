import InvoiceCard from "../../../components/shared/MobileInvoiceList";
import { mockInvoices } from "../../overview/components/LatestInvoices";
import { DataTable } from "../../../components/shared/DesktopInvoiceList/data-table";
import { columns } from "../../../components/shared/DesktopInvoiceList/columns";
import { useReceiptFilter } from "../../../store/useInvoiceStore";
import Image from "next/image";
import ReceiptPagination from "./ReceiptPagination";
import ReceiptFilter from "./ReceiptFilter";

const Receipts = () => {
  const { searchTerm, status } = useReceiptFilter();

  // SAFELY NORMALIZE SEARCH TERM
  const normalizedSearch = searchTerm?.trim().toLowerCase();

  // FILTERED DATA
  const filteredData = mockInvoices.filter((inv) => {
    const invoiceNumber = inv.invoice_number?.toLowerCase() ?? "";
    const payerName = inv.payer_name?.toLowerCase() ?? "";
    const invoiceStatus = inv.status?.toLowerCase() ?? "";

    // SEARCH FILTER
    const matchesSearch =
      !normalizedSearch ||
      invoiceNumber.includes(normalizedSearch) ||
      payerName.includes(normalizedSearch);

    // STATUS FILTER
    const matchesStatus = !status || invoiceStatus === status.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const noResults = filteredData.length === 0;

  return (
    <div>
      <div className="mt-10">
        {/* Pass filteredData to ReceiptFilter */}
        <ReceiptFilter filteredData={filteredData} />
      </div>

      <div className="mt-[30px]">
        {noResults ? (
          <div className="mt-14 flex flex-col items-center gap-8 md:mt-20 lg:mt-24 max-w-[163px] mx-auto">
            <Image
              src="/images/no-Invoice-svg.svg"
              alt="No Invoice"
              height={200}
              width={200}
              className="w-full h-full object-contain"
            />

            <p className="text-center text-sm font-light md:text-xl">
              {!searchTerm && status === "paid"
                ? "You have not created any invoice yet. All created invoices will be displayed here."
                : "No Receipt Found."}
            </p>
          </div>
        ) : (
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
              <ReceiptPagination />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Receipts;
