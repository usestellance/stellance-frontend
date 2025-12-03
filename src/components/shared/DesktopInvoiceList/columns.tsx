import { ColumnDef } from "@tanstack/react-table";
import { InvoiceType } from "../../../types/invoiceTypes";
import { StatusBadge, StatusType } from "../InvoiceStatusBadge";

export const columns: ColumnDef<InvoiceType>[] = [
  {
    accessorKey: "invoice_number",
    header: "Invoice ID",
  },
  {
    id: "customer_details",
    header: "Customer Details",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.payer_name}</span>
          <span className="text-sm text-muted-foreground">
            {row.original.payer_email}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "created_at",
    header: "Date Issued",
    cell: ({ row }) => {
      return new Date(row.getValue("created_at")).toLocaleDateString();
    },
  },
  {
    accessorKey: "due_date",
    header: "Due Date",
    cell: ({ row }) => {
      return new Date(row.getValue("due_date")).toLocaleDateString();
    },
  },
  {
    accessorKey: "total",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"));
      const currency = row.original.currency;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
      }).format(amount);
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as StatusType;
      return <StatusBadge status={status} variant="outlined" />;
    },
  },
];
