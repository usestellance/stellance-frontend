import { create } from "zustand";

interface VariableStore {
  wallet: "$" | "XML";
  setWallet: (newWallet: "$" | "XML") => void;
}

export const useVariableStore = create<VariableStore>((set) => ({
  wallet: "XML",
  setWallet: (newWallet) => set({ wallet: newWallet }),
}));
