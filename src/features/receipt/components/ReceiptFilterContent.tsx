"use client";

import InputField from "../../../components/ui/custom/InputField";
import { IoIosSearch } from "react-icons/io";
import {
  useInvoiceFilter,
  InvoiceStatus,
  useReceiptFilter,
} from "../../../store/useInvoiceStore";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

import { invoiceStatusOptions } from "../../../config/constants";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";

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
    </div>
  );
};

export default ReceiptFilterContent;
