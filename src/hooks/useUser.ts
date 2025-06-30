import { toast } from "sonner";
import { dashboardRoute, signInRoute } from "../utils/route";
import { useRouter } from "next/navigation";
import useAxiosAuth from "./useAxiosAuth";
import {
  ILoginResponse,
  IUpdateUserResponse,
  IUser,
} from "../lib/types/userTypes";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { userAuth } from "../store/userAuth";

export const useCompleteProfile = () => {
  const { logout } = userAuth();
  const { post } = useAxiosAuth();
  const router = useRouter();

  // Define the function to handle the registration API call
  const handleCompleteProfile = async (data: IUser) => {
    // const response = await get('/auth/clear')
    const response = await post("/profile", {
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      business_name: data.business_name,
      Country: data.country,
    });
    console.log(response);
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
      // console.log(data);

      toast.success(data.message);
      router.push(dashboardRoute);
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
      setCredentials(access_token, user);
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
