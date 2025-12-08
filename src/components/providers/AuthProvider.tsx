/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { userAuth } from "../../store/userAuthStore";
import { authRoutes } from "../../config/routes";
import PageLoading from "../shared/PageLoading";
import { useGetUser } from "../../features/auth/hooks";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { initializeAuth, logout, setCredentials, credentials } = userAuth();

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeAuth();
    setIsInitialized(true);
  }, []);

  const accessToken = Cookies.get("access_token");

  const {
    isLoading: isUserLoading,
    isError: isUserError,
    data,
  } = useGetUser(isInitialized && !!accessToken);

  useEffect(() => {
    if (isInitialized && !accessToken) {
      logout();
      router.replace(authRoutes.LOGIN);
    }

    if (isInitialized && isUserError) {
      logout();
      router.replace(authRoutes.LOGIN);
    }
  }, [isInitialized, accessToken, isUserError]);

  useEffect(() => {
    if (accessToken && data) setCredentials(accessToken, data);
  }, [data, accessToken, isInitialized]);

  // ✅ Wait until credentials are actually set
  if (!isInitialized || isUserLoading || !credentials?.user?.profile) {
    return <PageLoading />;
  }

  return <>{children}</>;
}
