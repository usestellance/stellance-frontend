/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { userAuth } from "../store/userAuth";
import { signInRoute } from "../utils/route";
import { useSideBarStore } from "../store/NavStore";
import { useFetchInvoiceParams } from "../store/invoiceStore";
import PageLoading from "../components/webapp/PageLoading";
import { useGetUser } from "../hooks/useUser";
import Cookies from "js-cookie";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { initializeAuth, logout } = userAuth();
  const { resetState } = useSideBarStore();
  const { reset } = useFetchInvoiceParams();

  const [isInitialized, setIsInitialized] = useState(false);

  // console.log(credentials, ' credentials in auth provider');

  // ✅ Step 1: Mark auth as initialized on mount
  useEffect(() => {
    initializeAuth();
    setIsInitialized(true);
  }, []);

  // ✅ Step 2: Check if access_token exists in cookies
  const accessToken = Cookies.get("access_token");

  // ✅ Step 3: Fetch user if token is found
  const { isLoading: isUserLoading, isError: isUserError } = useGetUser(
    isInitialized && !!accessToken
  );

  // ✅ Step 4: Redirect to login if no token or user fetch fails
  useEffect(() => {
    if (isInitialized && !accessToken) {
      logout();
      router.replace(signInRoute);
    }

    if (isInitialized && isUserError) {
      logout();
      router.replace(signInRoute);
    }
  }, [isInitialized, accessToken, isUserError]);

  // ✅ Step 5: Reset UI state on route change
  useEffect(() => {
    reset();
    resetState();
  }, [pathname]);

  // ✅ Step 6: Wait until everything is ready
  if (!isInitialized || isUserLoading) {
    return <PageLoading showLogo />;
  }

  return <>{children}</>;
}

// /* eslint-disable react-hooks/exhaustive-deps */
// "use client";

// import { useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { userAuth } from "../store/userAuth";
// import { signInRoute } from "../utils/route";
// import { useSideBarStore } from "../store/NavStore";
// import { useFetchInvoiceParams } from "../store/invoiceStore";
// import PageLoading from "../components/webapp/PageLoading";
// import { useGetUser } from "../hooks/useUser";

// export default function AuthProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const pathname = usePathname();

//   const { initializeAuth, credentials, logout } = userAuth();
//   const { resetState } = useSideBarStore();
//   const { reset } = useFetchInvoiceParams();

//   const [isInitialized, setIsInitialized] = useState(false);

//   // Step 1: Restore credentials from sessionStorage
//   useEffect(() => {
//     initializeAuth();
//     setIsInitialized(true);
//   }, []);

//   // Step 2: Fetch user if token exists
//   const { isLoading: isUserLoading, isError: isUserError } = useGetUser(
//     isInitialized && !!credentials?.access_token,
//     credentials?.user?.id?.toString() || ""
//   );

//   // Step 3: Redirect to login if no token or fetch fails
//   // useEffect(() => {
//   //   if (isInitialized && !credentials?.access_token) {
//   //     logout();
//   //     router.replace(signInRoute);
//   //   }

//   //   if (isInitialized && isUserError) {
//   //     logout();
//   //     router.replace(signInRoute);
//   //   }
//   // }, [isInitialized, credentials?.access_token, isUserError, logout]);

//   // Step 4: Reset state on route change
//   useEffect(() => {
//     reset();
//     resetState();
//   }, [pathname, reset, resetState]);

//   // Step 5: Wait for session restore + user fetch
//   if (!isInitialized || isUserLoading) {
//     return <PageLoading showLogo />;
//   }

//   return <>{children}</>;
// }
