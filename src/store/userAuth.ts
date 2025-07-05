import { create } from "zustand";
import { IUser } from "../lib/types/userTypes";

type AuthState = {
  credentials: {
    profile_complete: boolean;
    email_verified: boolean;
    access_token: string;
    user: IUser;
  } | null;
  setCredentials: (
    access_token: string,
    user: IUser,
    profile_complete: boolean,
    email_verified: boolean
  ) => void;
  logout: () => void;
  initializeAuth: () => void;
};

// Helper function to get stored auth data
const getStoredAuth = () => {
  if (typeof window === "undefined") return null;

  try {
    const access_token = sessionStorage.getItem("access_token");
    const userData = sessionStorage.getItem("user");
    const profile_complete = sessionStorage.getItem("profile_complete");
    const email_verified = sessionStorage.getItem("email_verified");

    if (access_token && userData && profile_complete && email_verified) {
      return {
        access_token,
        user: JSON.parse(userData),
        profile_complete: profile_complete === "true",
        email_verified: email_verified === "true",
      };
    }
  } catch (error) {
    console.error("Error parsing stored auth data:", error);
  }

  return null;
};

export const userAuth = create<AuthState>((set) => ({
  credentials: null,

  setCredentials: (access_token, user, profile_complete, email_verified) => {
    // Store in sessionStorage
    sessionStorage.setItem("access_token", access_token);
    sessionStorage.setItem("profile_complete", profile_complete.toString());
    sessionStorage.setItem("email_verified", profile_complete.toString());
    sessionStorage.setItem("user", JSON.stringify(user));

    // Update state
    set(() => ({
      credentials: { access_token, user, profile_complete, email_verified },
    }));
  },

  logout: () => {
    // Clear sessionStorage
    sessionStorage.removeItem("profile_complete");
    sessionStorage.removeItem("email_verified");
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
