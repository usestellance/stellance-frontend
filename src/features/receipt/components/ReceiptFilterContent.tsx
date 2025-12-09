"use client";
import { BiPrinter } from "react-icons/bi";
import InputField from "../../../components/ui/custom/InputField";
import { IoIosSearch } from "react-icons/io";
import { useReceiptFilter } from "../../../store/useInvoiceStore";
import { ExportReceipt } from "./ExportReceipt";
import { useToast } from "../../../hooks/useToast";
import { printReceipts } from "../../../lib/utils/exportUtils";

interface ReceiptFilterContentProps {
  filteredData: any[]; // Replace with your Invoice type
}

const ReceiptFilterContent = ({ filteredData }: ReceiptFilterContentProps) => {
  const { searchTerm, setSearchTerm } = useReceiptFilter();
  const toast = useToast();

  const handlePrint = () => {
    try {
      if (filteredData.length === 0) {
        toast.warning("No data to print, There are no receipts to print.");
        return;
      }

      printReceipts(filteredData);
    } catch (error) {
      console.error("Print error:", error);
      toast.error("Print failed, An error occurred while printing receipts.");
    }
  };

  return (
    <div>
      {/* SEARCH FIELD */}
      <div className="relative">
        <InputField
          type="text"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-0 bg-primary-20 lg:h-12 placeholder:text-neutral-900 placeholder:font-normal pl-7 lg:pl-9 placeholder:text-xs lg:placeholder:text-base"
          placeholder="Search by payer name or invoice number..."
        />
        <IoIosSearch className="absolute text-neutral-900 top-6 lg:top-[40%] left-2 lg:left-3 text-base lg:text-xl" />
      </div>

      <div className="mt-[30px] flex justify-end gap-2.5 lg:gap-5">
        <ExportReceipt data={filteredData} />
        <button
          onClick={handlePrint}
          className="rounded-[5px] w-11 h-9 flex items-center justify-center cursor-pointer lg:rounded-xl bg-primary-50 hover:bg-primary-500 hover:text-white text-primary-500 lg:w-[60px] lg:h-[52px] duration-200"
        >
          <BiPrinter className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default ReceiptFilterContent;
