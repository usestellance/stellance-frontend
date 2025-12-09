"use client";
import { BiPrinter } from "react-icons/bi";
import InputField from "../../../components/ui/custom/InputField";
import { IoIosSearch } from "react-icons/io";
import { useReceiptFilter } from "../../../store/useInvoiceStore";
import { ExportReceipt } from "./ExportReceipt";

const ReceiptFilterContent = () => {
  const { searchTerm, setSearchTerm } = useReceiptFilter();

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
          placeholder="Search by payer name or  invoice number..."
        />
        <IoIosSearch className="absolute text-neutral-900 top-[45%] lg:top-[40%] left-2 lg:left-3 text-base lg:text-xl" />
      </div>

      <div className="mt-[30px] flex justify-end gap-2.5 lg:gap-5">
        <ExportReceipt />
        <div className="rounded-[5px] w-11 h-9 flex items-center justify-center cursor-pointer lg:rounded-xl bg-primary-50 hover:bg-primary-500 hover:text-white text-primary-500  lg:w-[60px] lg:h-[52px] duration-200">
          <BiPrinter className="text-xl" />
        </div>
      </div>
    </div>
  );
};

export default ReceiptFilterContent;
