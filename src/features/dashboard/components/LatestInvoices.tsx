import React from "react";
import InvoiceCard from "../../../components/shared/MobileInvoiceList";
import { InvoiceType } from "../../../types/invoiceTypes";

const mockInvoices: InvoiceType[] = [
  {
    id: "inv_001",
    invoice_number: "INV-001",
    payer_name: "Janet John",
    payer_email: "janet@example.com",
    total: 1100,
    status: "pending",
    approved: false,
    review_date: "2025-01-10T09:20:00Z",
    created_at: "2025-01-05",
    due_date: "2025-01-20",
    currency: "USD",
  },
  {
    id: "inv_002",
    invoice_number: "INV-002",
    payer_name: "David Mark",
    payer_email: "david@example.com",
    total: 300,
    status: "draft",
    approved: false,
    review_date: null,
    created_at: "2025-02-01",
    due_date: "2025-02-10",
    currency: "USD",
  },
  {
    id: "inv_003",
    invoice_number: "INV-003",
    payer_name: "Sarah Lee",
    payer_email: "sarah@example.com",
    total: 750,
    status: "sent",
    approved: false,
    review_date: null,
    created_at: "2025-02-15",
    due_date: "2025-02-25",
    currency: "USD",
  },
  {
    id: "inv_004",
    invoice_number: "INV-004",
    payer_name: "Michael Brown",
    payer_email: "michael@example.com",
    total: 1500,
    status: "viewed",
    approved: true,
    review_date: "2025-03-02T10:45:00Z",
    created_at: "2025-03-01",
    due_date: "2025-03-15",
    currency: "USD",
  },
  {
    id: "inv_005",
    invoice_number: "INV-005",
    payer_name: "Grace Peters",
    payer_email: "grace@example.com",
    total: 600,
    status: "paid",
    approved: true,
    review_date: "2025-03-05T13:15:00Z",
    created_at: "2025-02-28",
    due_date: "2025-03-10",
    currency: "USD",
  },
  {
    id: "inv_006",
    invoice_number: "INV-006",
    payer_name: "Samuel King",
    payer_email: "samuel@example.com",
    total: 400,
    status: "overdue",
    approved: false,
    review_date: "2025-03-20T08:00:00Z",
    created_at: "2025-03-01",
    due_date: "2025-03-05",
    currency: "USD",
  },
  {
    id: "inv_007",
    invoice_number: "INV-007",
    payer_name: "Tina Morgan",
    payer_email: "tina@example.com",
    total: 950,
    status: "cancelled",
    approved: false,
    review_date: "2025-04-10T15:30:00Z",
    created_at: "2025-04-01",
    due_date: "2025-04-12",
    currency: "USD",
  },
  {
    id: "inv_008",
    invoice_number: "INV-008",
    payer_name: "Kelvin Watts",
    payer_email: "kelvin@example.com",
    total: 2200,
    status: "viewed",
    approved: false,
    review_date: "2025-04-20T12:00:00Z",
    created_at: "2025-04-15",
    due_date: "2025-05-01",
    currency: "USD",
  },
  {
    id: "inv_009",
    invoice_number: "INV-009",
    payer_name: "Monica Stone",
    payer_email: "monica@example.com",
    total: 1300,
    status: "paid",
    approved: true,
    review_date: "2025-05-06T11:10:00Z",
    created_at: "2025-05-01",
    due_date: "2025-05-20",
    currency: "USD",
  },
  {
    id: "inv_010",
    invoice_number: "INV-010",
    payer_name: "Peter West",
    payer_email: "peter@example.com",
    total: 780,
    status: "sent",
    approved: false,
    review_date: null,
    created_at: "2025-05-10",
    due_date: "2025-05-25",
    currency: "USD",
  },
];

const LatestInvoices = () => {
  return (
    <div>
      <h4 className="font-medium text-sm sm:text-lg lg:text-2xl mb-2.5 md:mb-[30px]">
        Latest Invoices
      </h4>

      <div className="space-y-[15px]">
        {mockInvoices.map((inv) => (
          <InvoiceCard key={inv.id} invoice={inv} />
        ))}
      </div>
    </div>
  );
};

export default LatestInvoices;
