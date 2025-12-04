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
  page: number;
  size: number;
  setPage: (page: number) => void;
//   setOrderBy: (order: "asc" | "dsc") => void;
//   setPageCount: (count: number) => void;
  setSearchTerm: (value: string) => void;
  setStatus: (value: InvoiceStatus) => void;
  resetFilters: () => void;
}

export const useInvoiceFilter = create<InvoiceFilterState>((set) => ({
  page: 1,
  size: 10,
  searchTerm: "",
  status: "all",

  setSearchTerm: (value) => set({ searchTerm: value }),
  setStatus: (value) => set({ status: value }),
  setPage: (page) => set({ page }),
//   setOrderBy: (order_by) => set({ order_by }),
//   setPageCount: (page_count) => set({ page_count }),

  resetFilters: () =>
    set({
      searchTerm: "",
      status: "all",
    }),
}));
