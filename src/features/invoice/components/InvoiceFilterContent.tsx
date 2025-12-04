"use client";

import InputField from "../../../components/ui/custom/InputField";
import { IoIosSearch } from "react-icons/io";
import {
  useInvoiceFilter,
  InvoiceStatus,
} from "../../../store/useInvoiceStore";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

import { invoiceStatusOptions } from "../../../config/constants";

const InvoiceFilterContent = () => {
  const { searchTerm, setSearchTerm, status, setStatus } = useInvoiceFilter();

  return (
    <div>
      {/* SEARCH FIELD */}
      <div className="relative">
        <InputField
          type="text"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-0 bg-primary-20 placeholder:text-neutral-900 placeholder:font-normal pl-7 placeholder:text-xs"
          placeholder="Search"
        />
        <IoIosSearch className="absolute text-neutral-900 top-[45%] left-2 text-base" />
      </div>

      {/* STATUS SELECT */}
      <div className="mt-5">
        <Select
          value={status}
          onValueChange={(val: InvoiceStatus) => setStatus(val)}
        >
          <SelectTrigger className="h-[30px] rounded-[6px] min-w-[100px] max-w-[150px] shadow-none border-neutral-800 text-xs font-medium bg-white px-2.5">
            <SelectValue />
          </SelectTrigger>

          <SelectContent className="">
            {invoiceStatusOptions.map((opt) => (
              <SelectItem
                className="data-[state=checked]:bg-primary-50 data-[state=checked]:text-primary font-meduim"
                key={opt.value}
                value={opt.value}
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default InvoiceFilterContent;
