import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getPasswordStrength = (password: string) => {
  if (!password) return { score: 0, label: "Weak", color: "bg-red-500" };

  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[@$!%*?&]/.test(password)) score++;

  const labels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
  const colors = [
    "bg-error-500",
    "bg-warning-400",
    "bg-warning-600",
    "bg-success-300",
    "bg-success-500",
  ];

  return {
    score,
    label: labels[score],
    color: colors[score],
  };
};

export const invoiceItems = [
  {
    description: "UI/UX Design (Landing Page)",
    invoice_type: "per_hour",
    quantity: 12, // hours
    unit_price: 15000, // per hour
    discount: 10, // %
    amount: 162000, // (12 * 15000) - 10%
  },
  {
    description: "Frontend Development (Next.js)",
    invoice_type: "per_hour",
    quantity: 20, // hours
    unit_price: 20000, // per hour
    discount: 0,
    amount: 400000,
  },
  {
    description: "Backend API Integration",
    invoice_type: "per_hour",
    quantity: 8, // hours
    unit_price: 18000,
    discount: 5,
    amount: 136800,
  },
  {
    description: "Custom Logo Design",
    invoice_type: "per_unit",
    quantity: 1, // units
    unit_price: 120000, // per unit
    discount: 0,
    amount: 120000,
  },
  {
    description: "Business Card Printing",
    invoice_type: "per_unit",
    quantity: 3,
    unit_price: 15000,
    discount: 10,
    amount: 40500,
  },
  {
    description: "Website Maintenance (Monthly)",
    invoice_type: "per_unit",
    quantity: 1,
    unit_price: 50000,
    discount: 5,
    amount: 47500,
  },
];
