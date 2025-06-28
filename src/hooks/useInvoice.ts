"use client";
import { toast } from "sonner";
import { invoiceRoute, signInRoute } from "../utils/route";
import axios, { AxiosError } from "axios";
import { userAuth } from "../store/userAuth";
import useAxiosAuth from "./useAxiosAuth";
import { InvoiceResponseType, InvoiceType } from "../lib/types/invoiceType";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useFetchInvoiceParams } from "../store/invoiceStore";

export const useCreateInvoice = () => {
  const { logout } = userAuth();
  const { post } = useAxiosAuth();
  const router = useRouter();

  // Define the function to handle the registration API call
  const handleCreateInvoice = async (data: InvoiceType) => {
    // const response = await get('/auth/clear')
    const response = await post("/invoice", {
      title: data.title,
      payer_name: data.payer_name,
      payer_email: data.payer_email,
      country: data.country,
      invoice_items: data.invoice_items,
      due_date: data.due_date,
      service_fee: data.service_fee,
    });
    console.log(response);
    return response.data;
  };

  // Use React Query's useMutation hook with additional configurations
  const mutation = useMutation<
    InvoiceResponseType,
    AxiosError<InvoiceResponseType>,
    InvoiceType
  >({
    mutationFn: handleCreateInvoice,
    onSuccess: (data: InvoiceResponseType) => {
      console.log(data);

      toast.success(data.message);
      router.push(invoiceRoute);
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

export const useGetInvoices = () => {
  // const router = useRouter();
  const { credentials } = userAuth();
  const { get } = useAxiosAuth();
  const { order_by, page, page_count, status } = useFetchInvoiceParams();

  const user_id = credentials?.user.id;

  const handleGetInvoices = async () => {
    const params = new URLSearchParams();

    if (user_id) params.append("user_id", user_id);
    if (order_by) params.append("order_by", order_by);
    if (page_count) params.append("page_count", page_count.toString());
    if (status) params.append("status", status);
    if (page) params.append("page", page.toString());

    const url = `/invoice?${params.toString()}`;
    const res = await get(url);

    // console.log(response.data);
    // responseStatus(res.status, res.data, router);
    return res.data.data;
  };

  return useQuery({
    queryKey: ["invoices", page, page_count, status, order_by, user_id],
    queryFn: handleGetInvoices,
    enabled: !!credentials?.access_token,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
