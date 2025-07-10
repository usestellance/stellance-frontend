"use client";
import { toast } from "sonner";
import { invoiceRoute, signInRoute } from "../utils/route";
import axios, { AxiosError } from "axios";
import { userAuth } from "../store/userAuth";
import useAxiosAuth from "./useAxiosAuth";
import { InvoiceResponseType, InvoiceType } from "../lib/types/invoiceType";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { axiosInstance } from "../config/axios";
// import { useFetchInvoiceParams } from "../store/invoiceStore";

export const useCreateInvoice = () => {
  const { logout, credentials } = userAuth();
  const { post } = useAxiosAuth();
  const router = useRouter();
  const is_profile_complete = credentials?.profile_complete;

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
    // console.log(response);
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
      // console.log(data);

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
        toast.error(is_profile_complete && errorMessage);
      }
      // console.log(error?.response);
    },
  });

  // Return the mutation object to use in components
  return mutation;
};

export const useGetInvoices = ({
  order_by = "desc",
  page = 1,
  page_count = 10,
  status = "",
}: {
  order_by?: string;
  page?: number;
  page_count?: number;
  status?: string;
}) => {
  // const router = useRouter();
  const { credentials } = userAuth();
  const { get } = useAxiosAuth();
  // const { order_by, page, page_count, status } = useFetchInvoiceParams();

  const user_id = credentials?.user?.profile?.id;
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

export const useGetInvoice = ({ invoice_id }: { invoice_id: string }) => {
  const { credentials } = userAuth();
  const { get } = useAxiosAuth();

  const handleGetInvoice = async () => {
    // const params = new URLSearchParams();

    // if (invoice_id) params.append("id", invoice_id);

    // const url = `/invoice/search?${params.toString()}`;
    const url = `/invoice/${invoice_id}`;
    const res = await get(url);

    // console.log(response.data);
    // responseStatus(res.status, res.data, router);
    return res.data.data;
  };

  return useQuery({
    queryKey: ["invoice", invoice_id],
    queryFn: handleGetInvoice,
    enabled: !!credentials?.access_token,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useGetInvoiceForClient = ({
  invoice_url,
}: {
  invoice_url: string;
}) => {
  // const { get } = useAxiosAuth();

  const handleGetInvoiceForClient = async () => {
    const params = new URLSearchParams();

    if (invoice_url) params.append("url", invoice_url);

    const url = `/invoice/search?${params.toString()}`;
    // const url = `/invoice/search?url=78522-6b18I-5f2fa428f4848385N0`;
    const res = await axiosInstance.get(url);

    // console.log(invoice_url);

    // console.log(res);
    // responseStatus(res.status, res.data, router);
    return res.data.data;
  };

  return useQuery({
    queryKey: ["client_invoice", invoice_url],
    queryFn: handleGetInvoiceForClient,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useSendInvoice = (invoiceId: string, email?: string) => {
  const { logout } = userAuth();
  const { get } = useAxiosAuth();
  const router = useRouter();

  // Define the function to handle the send invoice API call
  const handleSendInvoice = async () => {
    // Build the URL conditionally based on whether email is provided
    const url = email
      ? `/invoice/send/${invoiceId}?email=${email}`
      : `/invoice/send/${invoiceId}`;

    const response = await get(url);
    // console.log(response);
    return response.data;
  };

  // Use React Query's useMutation hook
  const mutation = useMutation<
    InvoiceResponseType,
    AxiosError<InvoiceResponseType>,
    void // No parameters needed since we're using closure
  >({
    mutationFn: handleSendInvoice,
    onSuccess: (data: InvoiceResponseType) => {
      // console.log(data);
      toast.success(data.message);
      window.location.reload();
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

export const useReviewInvoice = (invoiceId: string, approve: boolean) => {
  // const router = useRouter();

  // Define the function to handle the send invoice API call
  const handleSendInvoice = async () => {
    // Build the URL conditionally based on whether email is provided
    const url = `/invoice/review/${invoiceId}?approve=${approve}`;

    const response = await axiosInstance.get(url);
    // console.log(response);
    return response.data;
  };

  // Use React Query's useMutation hook
  const mutation = useMutation<
    InvoiceResponseType,
    AxiosError<InvoiceResponseType>,
    void // No parameters needed since we're using closure
  >({
    mutationFn: handleSendInvoice,
    onSuccess: (data: InvoiceResponseType) => {
      // console.log(data);
      toast.success(data.message);
      window.location.reload();
    },
    onError: (error) => {
      const errorMessage =
        axios.isAxiosError(error) && error?.response?.data?.message
          ? error?.response?.data?.message
          : "An unknown error occurred.";

      toast.error(errorMessage);
      console.log(error?.response);
    },
  });

  return mutation;
};

export const useDeleteInvoice = (invoiceId: string) => {
  const { logout } = userAuth();
  const axiosAuth = useAxiosAuth();
  const router = useRouter();

  // Define the function to handle the send invoice API call
  const handleSendInvoice = async () => {
    // Build the URL conditionally based on whether email is provided
    const url = `/invoice/${invoiceId}`;

    const response = await axiosAuth.delete(url);
    // console.log(response);
    return response.data;
  };

  // Use React Query's useMutation hook
  const mutation = useMutation<
    InvoiceResponseType,
    AxiosError<InvoiceResponseType>,
    void // No parameters needed since we're using closure
  >({
    mutationFn: handleSendInvoice,
    onSuccess: (data: InvoiceResponseType) => {
      // console.log(data);
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

  return mutation;
};
