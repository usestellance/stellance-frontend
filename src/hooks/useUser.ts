"use client";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { signInRoute, walletRoute } from "../utils/route";
import { useRouter } from "next/navigation";
import useAxiosAuth from "./useAxiosAuth";
import {
  ILoginResponse,
  IUpdateUserResponse,
  IUser,
  UserFormValues,
} from "../lib/types/userTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { userAuth } from "../store/userAuth";
import { useEffect } from "react";

export const useCompleteProfile = () => {
  const { logout } = userAuth();
  const { post } = useAxiosAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  // Define the function to handle the registration API call
  const handleCompleteProfile = async (data: UserFormValues) => {
    // const response = await get('/auth/clear')
    const response = await post("/profile", {
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      business_name: data.business_name,
      Country: data.country,
    });
    // console.log(response);
    return response.data;
  };

  // Use React Query's useMutation hook with additional configurations
  const mutation = useMutation<
    ILoginResponse,
    AxiosError<ILoginResponse>,
    UserFormValues
  >({
    mutationFn: handleCompleteProfile,
    onSuccess: (data: ILoginResponse) => {
      // 🔁 Invalidate user cache to trigger refetch
      queryClient.invalidateQueries({ queryKey: ["user"] });

      toast.success(data.message);
      router.push(walletRoute);
    },
    onError: (error) => {
      const errorMessage =
        axios.isAxiosError(error) && error?.response?.data?.message
          ? error?.response?.data?.message
          : "An unknown error occurred.";
      toast.error(errorMessage);
      if (error.response?.status === 401) {
        router.push(signInRoute);
        logout();
      }
      // console.log(error?.response);
    },
  });

  // Return the mutation object to use in components
  return mutation;
};

export const useUpdateProfile = () => {
  const { logout } = userAuth();
  const { put } = useAxiosAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Define the function to handle the registration API call
  const handleUpdateProfile = async (data: UserFormValues) => {
    // const response = await get('/auth/clear')
    const response = await put(`/profile`, {
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      business_name: data.business_name,
      country: data.country,
    });
    // console.log(response);
    return response.data;
  };

  // Use React Query's useMutation hook with additional configurations
  const mutation = useMutation<
    IUpdateUserResponse,
    AxiosError<IUpdateUserResponse>,
    UserFormValues
  >({
    mutationFn: handleUpdateProfile,
    onSuccess: (data: IUpdateUserResponse) => {
      // console.log(data.data);
      // const user = data.data;

      // console.log(access_token, user);
      // setCredentials(access_token, user);
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      const errorMessage =
        axios.isAxiosError(error) && error?.response?.data?.message
          ? error?.response?.data?.message
          : "An unknown error occurred.";
      toast.error(errorMessage);
      if (error.response?.status === 401) {
        router.push(signInRoute);
        logout();
      }
      // console.log(error?.response);
    },
  });

  // Return the mutation object to use in components
  return mutation;
};

// export const useGetUser = (enabled: boolean = true) => {
//   const { get } = useAxiosAuth();
//   const { setCredentials } = userAuth();

//   const handleGetUser = async (): Promise<IUser> => {
//     const response = await get(`/profile/me`);

//     // console.log("Profile response:", response?.data?.data);

//     if (!response?.data?.data?.profile) {
//       throw new Error("User profile data is missing");
//     }
//     // console.log("User profile data:", response.data.data);
//     return response?.data?.data;
//   };

//   const query = useQuery<IUser, AxiosError>({
//     queryKey: ["user"],
//     queryFn: handleGetUser,
//     enabled,
//     retry: 1,
//     refetchOnMount: false,
//     refetchOnWindowFocus: false,
//     staleTime: 1000 * 60 * 5, // 5 minutes
//   });

//   useEffect(() => {
//     if (query.isSuccess && query.data) {
//       const token = Cookies.get("access_token") || "";

//       if (token) {
//         setCredentials(token, query.data);
//       }
//     }

//     if (query.isError) {
//       toast.error("Failed to fetch user profile.");
//     }
//   }, [query.isSuccess, query.isError, query.data, setCredentials]);

//   return query;
// };

export const useGetUser = (enabled = true) => {
  const { get } = useAxiosAuth();
  const { setCredentials } = userAuth();

  const handleGetUser = async (): Promise<IUser> => {
    const response = await get(`/profile/me`);
    if (!response?.data?.data?.profile) {
      throw new Error("User profile data is missing");
    }
    return response.data.data;
  };

  const query = useQuery<IUser, AxiosError>({
    queryKey: ["user"],
    queryFn: handleGetUser,
    enabled,
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      const token = Cookies.get("access_token");
      if (token) {
        setCredentials(token, query.data);
      }
    }

    if (query.isError) {
      toast.error("Failed to fetch user profile.");
    }
  }, [query.isSuccess, query.isError, query.data, setCredentials]);

  return query;
};
