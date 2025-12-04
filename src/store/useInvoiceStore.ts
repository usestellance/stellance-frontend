import { create } from "zustand";

export type InvoiceStatus =
  | "all"
  | "draft"
  | "sent"
  | "paid"
  | "overdue"
  | "viewed"
  | "cancelled"
  | "pending";

interface InvoiceFilterState {
  searchTerm: string;
  status: InvoiceStatus;
  setSearchTerm: (value: string) => void;
  setStatus: (value: InvoiceStatus) => void;
  resetFilters: () => void;
}

export const useInvoiceFilter = create<InvoiceFilterState>((set) => ({
  searchTerm: "",
  status: "all",

  setSearchTerm: (value) => set({ searchTerm: value }),
  setStatus: (value) => set({ status: value }),

  resetFilters: () =>
    set({
      searchTerm: "",
      status: "all",
    }),
}));
