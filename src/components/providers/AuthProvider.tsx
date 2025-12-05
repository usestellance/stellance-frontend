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
  const { initializeAuth, logout, setCredentials } = userAuth();

  const [isInitialized, setIsInitialized] = useState(false);

  // ✅ Step 1: Mark auth as initialized on mount
  useEffect(() => {
    initializeAuth();
    setIsInitialized(true);
  }, []);

  // ✅ Step 2: Check if access_token exists in cookies
  const accessToken = Cookies.get("access_token");
  // ✅ Step 3: Fetch user if token is found
  const {
    isLoading: isUserLoading,
    isError: isUserError,
    data,
  } = useGetUser(isInitialized && !!accessToken);

  console.log(data);

  // ✅ Step 4: Redirect to login if no token or user fetch fails
  useEffect(() => {
    if (isInitialized && !accessToken) {
      logout();
      router.replace(authRoutes.LOGIN);
    }

    if (isInitialized && isUserError) {
      logout();
      router.replace(authRoutes.LOGIN);
    }

    if (accessToken && data) setCredentials(accessToken, data);
  }, [isInitialized, accessToken, isUserError, data]);

  //   ✅ Step 6: Wait until everything is ready
  if (!isInitialized || isUserLoading) {
    return <PageLoading />;
  }

  return <>{children}</>;
}
