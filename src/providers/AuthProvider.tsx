/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { userAuth } from "../store/userAuth";
import { signInRoute } from "../utils/route";
import { useSideBarStore } from "../store/NavStore";
import PageLoading from "../components/webapp/PageLoading";
import { useFetchInvoiceParams } from "../store/invoiceStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resetState } = useSideBarStore();
  const pathname = usePathname();
  const { reset } = useFetchInvoiceParams();

  const router = useRouter();
  const { initializeAuth, credentials, logout } = userAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    reset(); // reset Zustand store whenever pathname changes
    resetState();
  }, [pathname, reset]);

  useEffect(() => {
    // Initialize auth state first
    initializeAuth();
    setIsInitialized(true);
  }, [initializeAuth]);

  useEffect(() => {
    // Only check credentials after initialization
    if (isInitialized) {
      if (!credentials) {
        router.replace(signInRoute);
        logout();
      }
      resetState();
    }
  }, [isInitialized, credentials]);

  // Show loading while initializing
  if (!isInitialized) {
    return <PageLoading showLogo />;
  }

  // Show loading while redirecting
  if (!credentials) {
    return <PageLoading showLogo />;
  }

  return <>{children}</>;
}
