import { toast } from "sonner";
import { dashboardRoute } from "../utils/route";
import { useRouter } from "next/navigation";
import useAxiosAuth from "./useAxiosAuth";
import { ILoginResponse, IUser } from "../lib/types/userTypes";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const useCompleteProfile = () => {
  const { post } = useAxiosAuth();
  const router = useRouter();

  // Define the function to handle the registration API call
  const handleCompleteProfile = async (data: IUser) => {
    const response = await post("/profile", {
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      business_name: data.business_name,
      Country: data.country,
    });
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
      console.log(data.data);

      toast.success(data.message);
        router.push(dashboardRoute);
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
