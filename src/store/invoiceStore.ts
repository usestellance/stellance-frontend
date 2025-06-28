// store/invoiceItems.ts
import { create } from "zustand";
import { InvoiceItemsTypes } from "../lib/types/invoiceType";

interface InvoiceItemsStore {
  items: InvoiceItemsTypes[];
  editingIndex: number | null;
  addItem: (item: InvoiceItemsTypes) => void;
  updateItem: (item: InvoiceItemsTypes) => void;
  setEditingIndex: (index: number | null) => void;
  removeItem: (index: number) => void;
  clearItems: () => void;
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
}));


interface FetchInvoiceProps {
  status: string;
  page: number;
  order_by: "asc" | "dsc";
  page_count: number;
  setStatus: (status: string) => void;
  setPage: (page: number) => void;
  setOrderBy: (order: "asc" | "dsc") => void;
  setPageCount: (count: number) => void;
  reset: () => void;
}

// Default values
const defaultState = {
  status: "draft",
  page: 1,
  order_by: "asc" as "asc" | "dsc",
  page_count: 10,
};

export const useFetchInvoiceParams = create<FetchInvoiceProps>((set) => ({
  ...defaultState,
  setStatus: (status) => set({ status }),
  setPage: (page) => set({ page }),
  setOrderBy: (order_by) => set({ order_by }),
  setPageCount: (page_count) => set({ page_count }),
  reset: () => set(defaultState),
}));
