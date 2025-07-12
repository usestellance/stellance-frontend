import { create } from "zustand";

interface VariableStore {
  wallet: "usdc" | "xml";
  setWallet: (newWallet: "usdc" | "xml") => void;
}

export const useVariableStore = create<VariableStore>((set) => ({
  wallet: "usdc",
  setWallet: (newWallet) => set({ wallet: newWallet }),
}));

