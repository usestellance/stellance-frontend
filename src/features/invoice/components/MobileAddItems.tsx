import React from "react";
import { Button } from "../../../components/ui/button";

const MobileAddItems = () => {
  return (
    <div className="">
      <Button
        variant="ghost"
        className="w-fit min-w-[123px] text-xs font-medium h-9 mt-[15px]"
      >
        Add New Item
      </Button>
    </div>
  );
};

export default MobileAddItems;
