// store/invoiceItems.ts
import { create } from "zustand";

interface Item {
  invoiceType: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  amount: number;
}

interface InvoiceItemsStore {
  items: Item[];
  editingIndex: number | null;
  addItem: (item: Item) => void;
  updateItem: (item: Item) => void;
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
