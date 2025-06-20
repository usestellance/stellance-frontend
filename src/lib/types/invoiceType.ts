export interface InvoiceItemsTypes {
  invoiceType: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  amount: number;
}

export interface InvoiceType {
  title: string;
  billTo: string;
  email: string;
  address: string;
  items: InvoiceItemsTypes[];
  dueDate: string;
  note: string;
  serviceFee: string;
}
