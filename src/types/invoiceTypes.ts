import { StatusType } from "../components/shared/InvoiceStatusBadge";

export interface InvoiceItemsTypes {
  invoice_type: string;
  description: string;
  quantity: number;
  // unit_price: number | null;
  // discount: number | null;
  // amount: number | null;
  unit_price: number;
  discount: number;
  amount: number;
}

export interface InvoiceType {
  template_id: string;
  // logo: string ;
  logo?: File | null | string;
  filename?: string;
  make_default?: boolean;
  approved?: boolean;
  id?: string;
  invoice_number?: string;
  review_date?: string | null;
  invoice_url?: string;
  title?: string;
  payer_name?: string;
  payer_email?: string;
  country?: string;
  sub_total?: number;
  total?: number;
  currency?: string;
  note?: string;
  logo_url?: string;
  status?: StatusType;
  description?: string;
  due_date?: string;
  service_fee?: number;
  created_at?: string;
  updated_at?: string;
  invoice_items?: InvoiceItemsTypes[];
  items?: InvoiceItemsTypes[];
  createdBy?: {
    business_name: string;
    // wallet_address: string;
    email: string;
    location: string;
    name: string;
    user_id: string;
  };
}

export interface InvoiceResponseType {
  status_code: number;
  message: string;
  data: InvoiceType;
}
