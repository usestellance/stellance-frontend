import { InvoiceItemsTypes } from "../../lib/types/invoiceType";
import { SERVICE_CHARGE } from "../Constants";

// utils/formatCurrency.ts
export function formatCurrency(
  value: number,
  currency: string = "USD",
  locale: string = "en-US"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);
}



// Calculates subtotal (sum of all item amounts after individual discounts)
export function calculateTotal(items: InvoiceItemsTypes[]): number {
  return items.reduce((total, item) => {
    const itemTotal =
      item.quantity * item.unit_price * ((100 - item.discount) / 100);
    return total + itemTotal;
  }, 0);
}

export function calculateServiceFee(
  subtotal: number
  //   feePercentage: number
): number {
  return (subtotal * SERVICE_CHARGE) / 100;
}

export function calculateNetTotal(
  subtotal: number,
  serviceFee: number
): number {
  return subtotal - serviceFee;
}

export function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, (char: string) => char.toUpperCase());
}
