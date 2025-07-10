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
} from "../lib/types/userTypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { userAuth } from "../store/userAuth";
import { useEffect } from "react";

export const useCompleteProfile = () => {
  const { logout } = userAuth();
  const { post } = useAxiosAuth();
  const router = useRouter();

  // Define the function to handle the registration API call
  const handleCompleteProfile = async (data: IUser) => {
    // const response = await get('/auth/clear')
    const response = await post("/profile", {
      first_name: data.profile.first_name,
      last_name: data.profile.last_name,
      phone_number: data.profile.phone_number,
      business_name: data.profile.business_name,
      Country: data.profile.country,
    });
    // console.log(response);
    return response.data;
  };

  // Use React Query's useMutation hook with additional configurations
  const mutation = useMutation<
    ILoginResponse,
    AxiosError<ILoginResponse>,
    IUser
  >({
    mutationFn: handleCompleteProfile,
    onSuccess: (data: ILoginResponse) => {
      sessionStorage.setItem("profile_complete", "true");
      // console.log(data);

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
  const { logout, setCredentials } = userAuth();
  const { put } = useAxiosAuth();
  const router = useRouter();

  // Define the function to handle the registration API call
  const handleUpdateProfile = async (data: IUser) => {
    // const response = await get('/auth/clear')
    const response = await put(`/profile`, {
      first_name: data.profile.first_name,
      last_name: data.profile.last_name,
      phone_number: data.profile.phone_number,
      business_name: data.profile.business_name,
      Country: data.profile.country,
    });
    console.log(response);
    return response.data;
  };

  // Use React Query's useMutation hook with additional configurations
  const mutation = useMutation<
    IUpdateUserResponse,
    AxiosError<IUpdateUserResponse>,
    IUser
  >({
    mutationFn: handleUpdateProfile,
    onSuccess: (data: IUpdateUserResponse) => {
      console.log(data.data);
      const user = data.data;

      const access_token = sessionStorage.getItem("access_token") || "";
      sessionStorage.setItem("user", JSON.stringify(user));

      // console.log(access_token, user);
      setCredentials(access_token, user, true, true);
      toast.success(data.message);
      // router.push(dashboardRoute);
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

export const useGetUser = (enabled: boolean = true) => {
  const { get } = useAxiosAuth();
  const { setCredentials } = userAuth();

  const handleGetUser = async (): Promise<IUser> => {
    const response = await get(`/profile/me`);

    console.log("Profile response:", response?.data?.data);

    if (!response?.data?.data?.profile) {
      throw new Error("User profile data is missing");
    }

    return response?.data?.data?.profile;
  };
  
  const query = useQuery<IUser, AxiosError>({
    queryKey: ["user"],
    queryFn: handleGetUser,
    enabled,
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      const token = Cookies.get("access_token") || "";

      if (token) {
        setCredentials(token, query.data, true, true);
      }
    }

    if (query.isError) {
      toast.error("Failed to fetch user profile.");
    }
  }, [query.isSuccess, query.isError, query.data, setCredentials]);

  return query;
};

