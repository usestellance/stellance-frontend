import { create } from "zustand";
import { IUser } from "../lib/types/userTypes";

type AuthState = {
  credentials: {
    access_token: string;
    user: IUser;
  } | null;
  setCredentials: (access_token: string, user: IUser) => void;
  logout: () => void;
  initializeAuth: () => void;
};

// Helper function to get stored auth data
const getStoredAuth = () => {
  if (typeof window === "undefined") return null;

  try {
    const access_token = sessionStorage.getItem("access_token");
    const userData = sessionStorage.getItem("user");

    if (access_token && userData) {
      return {
        access_token,
        user: JSON.parse(userData),
      };
    }
  } catch (error) {
    console.error("Error parsing stored auth data:", error);
  }

  return null;
};

export const userAuth = create<AuthState>((set) => ({
  credentials: null,

  setCredentials: (access_token, user) => {
    // Store in sessionStorage
    sessionStorage.setItem("access_token", access_token);
    sessionStorage.setItem("user", JSON.stringify(user));

    // Update state
    set(() => ({
      credentials: { access_token, user },
    }));
  },

  logout: () => {
    // Clear sessionStorage
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("user");

    // Clear state
    set(() => ({ credentials: null }));
  },

  initializeAuth: () => {
    const storedAuth = getStoredAuth();
    if (storedAuth) {
      set(() => ({ credentials: storedAuth }));
    }
  },
}));
