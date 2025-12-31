import { create } from "zustand";
import { InvoiceItemsTypes } from "../types/invoiceTypes";
import { invoiceItems } from "../lib/utils";

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

export const useReceiptFilter = create<InvoiceFilterState>((set) => ({
  page: 1,
  size: 10,
  searchTerm: "",
  status: "paid",

  setSearchTerm: (value) => set({ searchTerm: value }),
  setStatus: (value) => set({ status: value }),
  setPage: (page) => set({ page }),
  //   setOrderBy: (order_by) => set({ order_by }),
  //   setPageCount: (page_count) => set({ page_count }),

  resetFilters: () =>
    set({
      searchTerm: "",
      status: "paid",
    }),
}));

interface InvoiceItemsStore {
  items: InvoiceItemsTypes[];
  editingIndex: number | null;
  addItem: (item: InvoiceItemsTypes) => void;
  updateItem: (item: InvoiceItemsTypes) => void;
  setEditingIndex: (index: number | null) => void;
  removeItem: (index: number) => void;
  clearItems: () => void;
  openDrawer: boolean;
  setOpenDrawer: (open: boolean) => void;
}

export const useInvoiceItems = create<InvoiceItemsStore>((set) => ({
  items: [],
  editingIndex: null,

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  updateItem: (item) =>
    set((state) =>
      state.editingIndex !== null
        ? {
            items: state.items.map((it, idx) =>
              idx === state.editingIndex ? item : it
            ),
            editingIndex: null,
          }
        : state
    ),

  setEditingIndex: (index) => set({ editingIndex: index }),

  removeItem: (index) =>
    set((state) => ({
      items: state.items.filter((_, i) => i !== index),
    })),

  clearItems: () => set({ items: [], editingIndex: null }),

  openDrawer: false,
  setOpenDrawer: (open) => set({ openDrawer: open }),
}));
