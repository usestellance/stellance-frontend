"use client";

import { axiosAuth } from "@/config/axios";
import { useEffect } from "react";
import { userAuth } from "../store/userAuth";

export default function useAxiosAuth() {
  const { credentials: auth } = userAuth();
  // const refresh = useRefreshToken();

  //   console.log('auth token cred', auth)

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.access_token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // const responseIntercept = axiosAuth.interceptors.response.use(
    //   (response) => response,
    //   async (error) => {
    //     const prevRequest = error?.config;
    //     if (error?.response?.status === 403 && !prevRequest?.sent) {
    //       prevRequest.sent = true;
    //       const newAccessoken = await refresh();
    //       prevRequest.headers["Authorization"] = newAccessoken;
    //       return axiosAuth(prevRequest);
    //     }
    //     return Promise.reject(error);
    //   }
    // );

    return () => {
      // axiosAuth.interceptors.response.eject(responseIntercept);
      axiosAuth.interceptors.request.eject(requestIntercept);
    };
  }, [auth]);

  return axiosAuth;
}
