import { SERVICE_CHARGE } from "../../config/constants";
import { InvoiceItemsTypes } from "../../types/invoiceTypes";

// FORMAT CURRENCY
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

export const formatCurrencyStructure = (value: number | string): string => {
  const num =
    typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value;

  if (isNaN(num)) return "";

  return num.toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export function maskMiddle(
  text: string,
  visibleStart = 5,
  visibleEnd = 5
): string {
  if (text?.length <= visibleStart + visibleEnd) return text;

  const start = text?.slice(0, visibleStart);
  const end = text?.slice(-visibleEnd);
  // const masked = "*".repeat(text.length - (visibleStart + visibleEnd));
  const masked = "*".repeat(10);

  return `${start}${masked}${end}`;
}

// --------------------------
// Helper → Time Ago
// --------------------------
export const getTimeAgo = (timestamp: string) => {
  const now = new Date();
  const notificationTime = new Date(timestamp);
  const diffMs = now.getTime() - notificationTime.getTime();
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`;
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;

  return notificationTime.toLocaleDateString();
};

export function formatWalletCurrency(
  amount: number | undefined,
  wallet: "$" | "xlm"
): string {
  if (amount === undefined || isNaN(amount)) {
    return wallet === "$" ? "$ 0.00" : "XLM 0.00";
  }

  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return wallet === "$" ? `$ ${formatted}` : `XLM ${formatted}`;
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
    // feePercentage: number
): number {
  return (subtotal * SERVICE_CHARGE) / 100;
}

export function calculateNetTotal(
  subtotal: number,
  serviceFee: number
): number {
  return subtotal - serviceFee;
  // return subtotal;
}
