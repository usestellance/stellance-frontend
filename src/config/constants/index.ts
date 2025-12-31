import { InvoiceStatus } from "../../store/useInvoiceStore";

export const invoiceStatusOptions: { label: string; value: InvoiceStatus }[] = [
  { label: "All", value: "all" },
  { label: "Paid", value: "paid" },
  { label: "Pending", value: "pending" },
  { label: "Sent", value: "sent" },
  { label: "Viewed", value: "viewed" },
  { label: "Draft", value: "draft" },
  { label: "Overdue", value: "overdue" },
  { label: "Cancelled", value: "cancelled" },
];

export const SERVICE_CHARGE = 10;
