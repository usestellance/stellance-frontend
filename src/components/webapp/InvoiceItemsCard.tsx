import React, { FC } from "react";
import { FiTrash } from "react-icons/fi";
import { RiEditLine } from "react-icons/ri";
import { formatCurrency } from "../../utils/helpers/helperFunctions";

interface ICard {
  description: string;
  unit_price: number;
  quantity: number;
  amount: number;
  discount: number;
  removeItem: () => void;
  invoice_type: string;
  editItem: () => void;
}

const InvoiceItemsCard: FC<ICard> = ({
  amount,
  description,
  discount,
  invoice_type,
  quantity,
  unit_price,
  removeItem,
  editItem,
}) => {
  return (
    <div className="relative bg-primary-light rounded-[5px] px-[10px] pt-2 pb-3 md:hidden">
      <h6 className="text-[#8F8F8F] text-xs">Description</h6>
      <h5 className="text-[#22252A] text-xs mt-[6px] line-clamp-1">
        {description}
      </h5>

      <div className="flex gap-3 absolute -top-2 right-3">
        <div
          onClick={editItem}
          className="h-[26px] w-[26px] bg-white flex justify-center items-center rounded-full"
          style={{ boxShadow: "0px 4px 4px 0px #0000000D" }}
        >
          <RiEditLine size={15} className="text-[#4285F4] " />
        </div>
        <div
          className="h-[26px] w-[26px] bg-white flex justify-center items-center rounded-full"
          style={{ boxShadow: "0px 4px 4px 0px #0000000D" }}
          onClick={removeItem}
        >
          <FiTrash size={15} className="text-[#EB4335]" />
        </div>
      </div>

      <table className="text-xs border-collapse mt-[30px]">
        <thead>
          <tr>
            <th className="font-normal pr-[10px] text-[#8F8F8F]">
              {invoice_type === "per_hour" ? "Unit Price/hr" : "Unit Price"}
            </th>
            <th className="font-normal px-[10px] text-[#8F8F8F]">
              {invoice_type === "per_hour" ? "Quantity/hr" : "Quantity"}
            </th>
            <th className="font-normal px-[10px] text-[#8F8F8F]">Discount</th>
            <th className="font-normal px-[10px] text-[#8F8F8F]">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-xs text-text-strong">
            <td className="text-center py-[6px]">
              {formatCurrency(unit_price || 0)}
            </td>
            <td className="text-center">{quantity}</td>
            <td className="text-center">{discount}</td>
            <td className="text-center">{formatCurrency(amount || 0)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceItemsCard;
