import { userAuth } from "../store/userAuth";
import useAxiosAuth from "./useAxiosAuth";
// import { InvoiceResponseType, InvoiceType } from "../lib/types/invoiceType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { signInRoute } from "../utils/route";
import { useRouter } from "next/navigation";

interface WalletResponseType {
  message: string;
  data: {
    id: string;
    wallet_address: string;
    balance: {
      usdc: number;
      xlm: number;
    };
  };
}

export const useGenerateWallet = () => {
  const { logout } = userAuth();
  const { post } = useAxiosAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleCreateWallet = async () => {
    const response = await post("/wallet");
    return response.data;
  };

  const mutation = useMutation<
    WalletResponseType,
    AxiosError<WalletResponseType>
  >({
    mutationFn: handleCreateWallet,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(response.message);
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

  return mutation;
};

export const useGetWallet = (wallet_id: string) => {
  const { credentials } = userAuth();
  const { get } = useAxiosAuth();

  const handleGetWallet = async () => {
    // const url = `/wallet/${wallet_id}`;
    // const url = `/wallet/971d45fb-35fd-470f-9d40-ad7d659956d9`;
    const url = `/wallet/${wallet_id}`;
    const res = await get(url);

    // console.log(res.data);
    // responseStatus(res.status, res.data, router);
    return res.data.data;
  };

  return useQuery({
    queryKey: ["wallet", wallet_id],
    queryFn: handleGetWallet,
    enabled: !!credentials?.access_token,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
