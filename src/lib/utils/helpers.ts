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
  visibleStart = 7,
  visibleEnd = 10
): string {
  if (text?.length <= visibleStart + visibleEnd) return text;

  const start = text?.slice(0, visibleStart);
  const end = text?.slice(-visibleEnd);
  // const masked = "*".repeat(text.length - (visibleStart + visibleEnd));
  const masked = "*".repeat(10);

  return `${start}${masked}${end}`;
}

