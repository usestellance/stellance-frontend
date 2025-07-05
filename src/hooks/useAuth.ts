import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
// import { responseStatus } from "../utils/helpers";
import { dashboardRoute, signInRoute, verificationRoute } from "../utils/route";
import { axiosInstance } from "../config/axios";
import { ILoginResponse, IUser } from "../lib/types/userTypes";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();

  // Define the function to handle the registration API call
  const handleLogin = async (data: IUser) => {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  };

  // Use React Query's useMutation hook with additional configurations
  const mutation = useMutation<
    ILoginResponse,
    AxiosError<ILoginResponse>,
    IUser
  >({
    mutationFn: handleLogin,
    onSuccess: (data: ILoginResponse) => {
      const access_token = data.data.access_token;
      const email_verified = data.data.email_verified;
      const profile_complete = data.data.profile_complete;
      const user = data.data.user;
      sessionStorage.setItem("access_token", access_token);
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("profile_complete", profile_complete.toString());
      sessionStorage.setItem("email_verified", email_verified.toString());
      sessionStorage.setItem("user", JSON.stringify(user));

      // console.log(data);

      // const isProfileComplete = data.data.profile_complete;

      toast.success("Login Successful");
      router.push(dashboardRoute);
      // router.push(isProfileComplete ? dashboardRoute : accountSetUpRoute);
    },
    onError: (error) => {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "An unknown error occurred.";
      toast.error(errorMessage);
      console.log(error);
    },
  });

  // Return the mutation object to use in components
  return mutation;
};

export const useRegister = () => {
  const router = useRouter();

  // Define the function to handle the registration API call
  const handleRegister = async (data: IUser) => {
    const response = await axiosInstance.post("/auth/signup", data);
    return response.data;
  };

  // Use React Query's useMutation hook with additional configurations
  const mutation = useMutation<
    ILoginResponse,
    AxiosError<ILoginResponse>,
    IUser
  >({
    mutationFn: handleRegister,
    onSuccess: (data: ILoginResponse) => {
      const access_token = data.data.access_token;
      const user = data.data.user;
      sessionStorage.setItem("access_token", access_token);
      sessionStorage.setItem("user", JSON.stringify(user));
      // console.log(data.data);

      toast.success(data.message);
      router.push(verificationRoute(user?.email || ""));
    },
    onError: (error) => {
      const errorMessage =
        axios.isAxiosError(error) && error?.response?.data?.message
          ? error?.response?.data?.message
          : "An unknown error occurred.";
      toast.error(errorMessage);
      //   console.log(error?.response?.data);
    },
  });

  // Return the mutation object to use in components
  return mutation;
};

export const useResetPassword = () => {
  const router = useRouter();

  // Define the function to handle the registration API call
  const handleReset = async (data: IUser) => {
    // console.log(data)
    const response = await axiosInstance.post("/auth/reset-password", {
      email: data.email,
      otp: data.otp,
      confirm_password: data.password,
    });
    return response.data;
  };

  // Use React Query's useMutation hook with additional configurations
  const mutation = useMutation<
    ILoginResponse,
    AxiosError<ILoginResponse>,
    IUser
  >({
    mutationFn: handleReset,
    onSuccess: () => {
      toast.success("Reset Successful");
      router.push(signInRoute);
    },
    onError: (error) => {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "An unknown error occurred.";
      toast.error(errorMessage);
      console.log(error);
    },
  });

  // Return the mutation object to use in components
  return mutation;
};
