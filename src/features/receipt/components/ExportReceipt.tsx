"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "../../../hooks/useToast";
import {
  exportToCSV,
  exportToExcel,
  exportToPDF,
} from "../../../lib/utils/exportUtils";

interface ExportReceiptProps {
  data: any[]; // Replace with your Invoice type
}

export function ExportReceipt({ data }: ExportReceiptProps) {
  const toast = useToast();

  const handleExport = (format: "pdf" | "excel" | "csv") => {
    try {
      if (data.length === 0) {
        toast.warning("No data to export, There are no receipts to export.");
        return;
      }

      const timestamp = new Date().toISOString().split("T")[0];

      switch (format) {
        case "pdf":
          exportToPDF(data, `receipts-${timestamp}.pdf`);
          break;
        case "excel":
          exportToExcel(data, `receipts-${timestamp}.xlsx`);
          break;
        case "csv":
          exportToCSV(data, `receipts-${timestamp}.csv`);
          break;
      }

      toast.success(
        `Export successful, Receipts exported as ${format.toUpperCase()}`
      );
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Export failed, An error occurred while exporting receipts.");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-[10px] h-[35px] font-light w-[76px] hover:bg-primary-500 hover:text-white lg:w-[120px] lg:h-[50px] lg:text-xl"
        >
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[76px] text-neutral-900 lg:w-[120px] p-2"
        align="center"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => handleExport("pdf")}
            className="justify-center py-2 cursor-pointer hover:bg-primary-50 lg:text-lg hover:text-black-500"
          >
            PDF
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleExport("excel")}
            className="justify-center py-2 cursor-pointer hover:bg-primary-50 hover:text-black-500 lg:text-lg"
          >
            Excel
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleExport("csv")}
            className="justify-center py-2 cursor-pointer hover:bg-primary-50 hover:text-black-500 lg:text-lg"
          >
            CSV
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
