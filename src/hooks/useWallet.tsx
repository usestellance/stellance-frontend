import { useRouter } from "next/router";
import { userAuth } from "../store/userAuth";
import useAxiosAuth from "./useAxiosAuth";
import { InvoiceResponseType, InvoiceType } from "../lib/types/invoiceType";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { signInRoute } from "../utils/route";

export const useGenerateWallet = () => {
  const { logout } = userAuth();
  const { post } = useAxiosAuth();
  const router = useRouter();

  // Define the function to handle the registration API call
  const handleCreateWallet = async () => {
    // const response = await get('/auth/clear')
    const response = await post("/wallet");
    console.log(response);
    return response.data;
  };

  // Use React Query's useMutation hook with additional configurations
  const mutation = useMutation<
    InvoiceResponseType,
    AxiosError<InvoiceResponseType>,
    InvoiceType
  >({
    mutationFn: handleCreateWallet,
    onSuccess: (data: InvoiceResponseType) => {
      console.log(data);

      toast.success(data.message);
      //   router.push(invoiceRoute);
    },
    onError: (error) => {
      const errorMessage =
        axios.isAxiosError(error) && error?.response?.data?.message
          ? error?.response?.data?.message
          : "An unknown error occurred.";
      if (error.response?.status === 401) {
        toast.error("Unauthorized Access");
        router.push(signInRoute);
        logout();
      } else {
        toast.error(errorMessage);
      }
      console.log(error?.response);
    },
  });

  // Return the mutation object to use in components
  return mutation;
};
