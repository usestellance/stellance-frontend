import { axiosAuth } from "@/config/axios";
import { useEffect } from "react";
import { userAuth } from "../store/userAuth";
// import { useSelector } from "react-redux";

export default function useAxiosAuth() {
  const { credentials } = userAuth();
//   console.log(credentials);

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers[
            "Authorization"
          ] = `Bearer ${credentials?.access_token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
    };
  }, [credentials?.access_token]);

  return axiosAuth;
}
