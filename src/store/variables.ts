import { create } from "zustand";

type Theme = "light" | "dark";

interface VariableStore {
  wallet: "$" | "XML";
  setWallet: (newWallet: "$" | "XML") => void;

  theme: Theme;
  setTheme: (newTheme: Theme) => void;
  initializeTheme: () => void;
}

export const useVariableStore = create<VariableStore>((set) => ({
  wallet: "$",
  setWallet: (newWallet) => set({ wallet: newWallet }),

  theme: "light", // default (will be overwritten by initializeTheme)
  setTheme: (newTheme) => {
    localStorage.setItem("theme", newTheme);
    set({ theme: newTheme });

    const appBody = document.querySelector(".body");
    appBody?.classList.toggle("dark", newTheme === "dark");
  },

  initializeTheme: () => {
    if (typeof window === "undefined") return;

    const storedTheme = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window?.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const finalTheme: Theme = storedTheme ?? (prefersDark ? "dark" : "light");

    const appBody = document.querySelector(".body");
    appBody?.classList.toggle("dark", finalTheme === "dark");

    set({ theme: finalTheme });
  },
}));
