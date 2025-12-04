import { InvoiceStatus } from "../../store/useInvoiceStore";


export const invoiceStatusOptions: { label: string; value: InvoiceStatus }[] = [
  { label: "All", value: "all" },
  { label: "Draft", value: "draft" },
  { label: "Sent", value: "sent" },
  { label: "Paid", value: "paid" },
  { label: "Overdue", value: "overdue" },
  { label: "Viewed", value: "viewed" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Pending", value: "pending" },
];
