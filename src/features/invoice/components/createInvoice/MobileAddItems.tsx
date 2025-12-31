"use client";

import { Button } from "../../../../components/ui/button";
import { useInvoiceItems } from "../../../../store/useInvoiceStore";
import InvoiceItemsCard from "./mobile/InvoiceItemsCard";

interface Props {
  onAdd: () => void;
}

const MobileAddItems = ({ onAdd }: Props) => {
  const { items, removeItem, setEditingIndex } = useInvoiceItems();

  return (
    <div>
      <div className="flex flex-col gap-[26px]">
        {items.map((item, index) => (
          <InvoiceItemsCard
            key={index}
            {...item}
            removeItem={() => removeItem(index)}
            editItem={() => {
              setEditingIndex(index);
              onAdd();
            }}
          />
        ))}
      </div>

      <Button
        variant="ghost"
        className="mt-[15px] text-xs font-medium"
        onClick={() => {
          setEditingIndex(null);
          onAdd();
        }}
      >
        Add New Item
      </Button>
    </div>
  );
};

export default MobileAddItems;
