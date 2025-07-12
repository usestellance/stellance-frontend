import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { InvoiceItemsTypes } from "../../lib/types/invoiceType";
import { SERVICE_CHARGE } from "../Constants";
import { signInRoute } from "../route";
import { toast } from "sonner";

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


export function formatWalletCurrency(
  amount: number | undefined ,
  wallet: "usdc" | "xml"
): string {
  if (amount === undefined || isNaN(amount)) {
    return wallet === "usdc" ? "USDC 0.00" : "XLM 0.00";
  }

  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return wallet === "usdc" ? `USDC ${formatted}` : `XLM ${formatted}`;
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

  export const responseStatus = (
    statusCode: number,
    message: string,
    router: AppRouterInstance | string[]
  ) => {
    switch (statusCode) {
      case 401:
        router.push(signInRoute);
        toast.error(message);
        break;
      default:
        toast.error(message);
        break;
    }
  };

 const formatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  hour12: false,
  day: "numeric",
  month: "short",
  year: "numeric",
});

/**
 * Formats a valid ISO or Date object into:
 * "1:06 PM, June 18, 2025"
 * Returns "-" if input is invalid.
 */
export function formatDateTime(raw: string | Date | null | undefined): string {
  if (!raw) return "-";
  const date = raw instanceof Date ? raw : new Date(raw);
  if (isNaN(date.getTime())) return "-";
  return formatter.format(date);
}

export function formatDate(raw: string | Date | null | undefined): string {
  if (!raw) return "-";
  const date = raw instanceof Date ? raw : new Date(raw);
  if (isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}


export function maskMiddle(text: string, visibleStart = 7, visibleEnd = 10): string {
  if (text?.length <= visibleStart + visibleEnd) return text;

  const start = text?.slice(0, visibleStart);
  const end = text?.slice(-visibleEnd);
  // const masked = "*".repeat(text.length - (visibleStart + visibleEnd));
  const masked = "*".repeat(10);

  return `${start}${masked}${end}`;
}

