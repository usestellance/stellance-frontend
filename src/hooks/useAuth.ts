import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
// import { responseStatus } from "../utils/helpers";
import { dashboardRoute, signInRoute, verificationRoute } from "../utils/route";
import { axiosInstance } from "../config/axios";
import { ILoginResponse, UserFormValues } from "../lib/types/userTypes";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();

  const handleLogin = async (data: UserFormValues) => {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  };

  const mutation = useMutation<
    ILoginResponse,
    AxiosError<ILoginResponse>,
    UserFormValues
  >({
    mutationFn: handleLogin,
    onSuccess: (data: ILoginResponse) => {
      const access_token = data.data.access_token;
      const expiresInUnix = data.data.expires_in;

      const expiryDate = new Date(expiresInUnix * 1000);

      Cookies.set("access_token", access_token, {
        expires: expiryDate,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        path: "/",
      });

      toast.success("Login Successful");

      router.push(dashboardRoute);
    },
    onError: (error) => {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "An unknown error occurred.";
      toast.error(errorMessage);
    },
  });

  return mutation;
};


// export const useLogin = () => {
//   const router = useRouter();

//   // Define the function to handle the registration API call
//   const handleLogin = async (data: IUser) => {
//     const response = await axiosInstance.post("/auth/login", data);
//     return response.data;
//   };

//   // Use React Query's useMutation hook with additional configurations
//   const mutation = useMutation<
//     ILoginResponse,
//     AxiosError<ILoginResponse>,
//     IUser
//   >({
//     mutationFn: handleLogin,
//     onSuccess: (data: ILoginResponse) => {
//       const access_token = data.data.access_token;
//       // const email_verified = data.data.email_verified;
//       // const profile_complete = data.data.profile_complete;
//       // const user = data.data.user;
//       sessionStorage.setItem("access_token", access_token);
//       // sessionStorage.setItem("user", JSON.stringify(user));
//       // sessionStorage.setItem("profile_complete", profile_complete.toString());
//       // sessionStorage.setItem("email_verified", email_verified.toString());
//       // sessionStorage.setItem("user", JSON.stringify(user));

//       // console.log(data);

//       // const isProfileComplete = data.data.profile_complete;

//       toast.success("Login Successful");
//       // router.push(dashboardRoute);
//       // router.push(isProfileComplete ? dashboardRoute : accountSetUpRoute);
//     },
//     onError: (error) => {
//       const errorMessage =
//         axios.isAxiosError(error) && error.response?.data?.message
//           ? error.response.data.message
//           : "An unknown error occurred.";
//       toast.error(errorMessage);
//       console.log(error);
//     },
//   });

//   // Return the mutation object to use in components
//   return mutation;
// };

// export const useLogin = () => {
//   const router = useRouter();

//   // Function to handle login API call
//   const handleLogin = async (data: UserFormValues) => {
//     const response = await axiosInstance.post("/auth/login", data);
//     return response.data;
//   };

//   const mutation = useMutation<
//     ILoginResponse,
//     AxiosError<ILoginResponse>,
//     UserFormValues
//   >({
//     mutationFn: handleLogin,
//     onSuccess: (data: ILoginResponse) => {
//       const access_token = data.data.access_token;

//       // ✅ Store access token in cookies
//       Cookies.set("access_token", access_token, {
//         expires: 1, // Expires in 1 day
//         secure: process.env.NODE_ENV === "production", // true on HTTPS
//         sameSite: "Lax",
//         path: "/",
//       });

//       toast.success("Login Successful");

//       // Optional: redirect user
//       router.push(dashboardRoute);
//     },
//     onError: (error) => {
//       const errorMessage =
//         axios.isAxiosError(error) && error.response?.data?.message
//           ? error.response.data.message
//           : "An unknown error occurred.";
//       toast.error(errorMessage);
//       console.error(error);
//     },
//   });

//   return mutation;
// };

export const useRegister = () => {
  const router = useRouter();

  // Define the function to handle the registration API call
  const handleRegister = async (data: UserFormValues) => {
    const response = await axiosInstance.post("/auth/signup", data);
    return response.data;
  };

  // Use React Query's useMutation hook with additional configurations
  const mutation = useMutation<
    ILoginResponse,
    AxiosError<ILoginResponse>,
    UserFormValues
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
  const handleReset = async (data: UserFormValues) => {
    // console.log(data)
    const response = await axiosInstance.post("/auth/reset-password", {
      email: data.email,
      otp: data.otp,
      password: data.password,
      confirm_password: data.confirm_password,
    });
    return response.data;
  };

  // Use React Query's useMutation hook with additional configurations
  const mutation = useMutation<
    ILoginResponse,
    AxiosError<ILoginResponse>,
    UserFormValues
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
