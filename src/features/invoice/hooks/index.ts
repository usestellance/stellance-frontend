"use client";
import axios, { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore, useLogout } from "../../../store/userAuthStore";
import useAxiosAuth from "../../../hooks/useAxiosAuth";
import { InvoiceResponseType, InvoiceType } from "../../../types/invoiceTypes";
import { useToast } from "../../../hooks/useToast";
import { authRoutes, invoiceRoutes } from "../../../config/routes";
import { axiosInstance } from "../../../config/axios";
import { useInvoiceFilter } from "../../../store/useInvoiceStore";

// export const useCreateInvoice = () => {
//   const toast = useToast();
//   const credentials = useAuthStore((state) => state.credentials);
//   const logout = useLogout();
//   const axiosAuth = useAxiosAuth();
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const is_profile_complete = credentials?.user?.profile_complete;

//   // Define the function to handle the registration API call

//   const handleCreateInvoice = async (data: InvoiceType) => {
//     // const response = await get('/auth/clear')
//     const response = await axiosAuth.post("/invoice", {
//       title: data.title,
//       payer_name: data.payer_name,
//       payer_email: data.payer_email,
//       country: data.country,
//       invoice_items: data.invoice_items,
//       due_date: data.due_date,
//       service_fee: data.service_fee,
//     });
//     // console.log(response);
//     return response.data;
//   };

//   // Use React Query's useMutation hook with additional configurations
//   const mutation = useMutation<
//     InvoiceResponseType,
//     AxiosError<InvoiceResponseType>,
//     InvoiceType
//   >({
//     mutationFn: handleCreateInvoice,
//     onSuccess: (data: InvoiceResponseType) => {
//       // console.log(data);

//       queryClient.invalidateQueries({ queryKey: ["invoices"] });
//       toast.success(data.message);
//       router.push(invoiceRoutes.INVOICES);
//     },
//     onError: (error) => {
//       const errorMessage =
//         axios.isAxiosError(error) && error?.response?.data?.message
//           ? error?.response?.data?.message
//           : "An unknown error occurred.";
//       if (error.response?.status === 401) {
//         toast.error("Unauthorized Access");
//         router.push(authRoutes.LOGIN);
//         logout();
//       } else {
//         if (is_profile_complete) {
//           toast.error(errorMessage);
//         }
//       }
//       // console.log(error?.response);
//     },
//   });

//   // Return the mutation object to use in components
//   return mutation;
// };

// export const useCreateInvoice = () => {
//   const toast = useToast();
//   const credentials = useAuthStore((state) => state.credentials);
//   const logout = useLogout();
//   const axiosAuth = useAxiosAuth();
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const is_profile_complete = credentials?.user?.profile_complete;

//   const handleCreateInvoice = async (data: InvoiceType) => {
//     const formData = new FormData();

//     formData.append("title", data.title || "");
//     formData.append("payer_name", data.payer_name || "");
//     formData.append("payer_email", data.payer_email || "");
//     formData.append("country", data.country || "");
//     formData.append("due_date", data.due_date || "");
//     formData.append("template_id", data.template_id || ""); // REQUIRED
//     formData.append("service_fee", String(data.service_fee));
//     formData.append("make_default", String(data.make_default));
//     formData.append("invoice_items", JSON.stringify(data.invoice_items));
//     formData.append("template_id", JSON.stringify(data.template_id));
//     if (data.logo) {
//       formData.append("logo", data.logo);
//       formData.append("filename", data.logo);
//     }

//     const response = await axiosAuth.post("/invoice", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     // console.log("CREATE INVOICE RESPONSE:", response);
//     console.log("CREATE INVOICE RESPONSE:", data);

//     // return response.data;
//   };

//   return useMutation({
//     mutationFn: handleCreateInvoice,
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({ queryKey: ["invoices"] });
//       // toast.success(data.message);
//       toast.success('data.message');
//       // router.push(invoiceRoutes.INVOICES);
//     },
//     onError: (error: any) => {
//       const errorMessage =
//         error?.response?.data?.message ?? "An unknown error occurred.";

//       if (error.response?.status === 401) {
//         toast.error("Unauthorized Access");
//         logout();
//         router.push(authRoutes.LOGIN);
//       } else if (is_profile_complete) {
//         toast.error(errorMessage);
//       }
//     },
//   });
// };

export const useCreateInvoice = () => {
  const toast = useToast();
  const credentials = useAuthStore((state) => state.credentials);
  const logout = useLogout();
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const is_profile_complete = credentials?.user?.profile_complete;

  const handleCreateInvoice = async (data: InvoiceType) => {
    const formData = new FormData();

    formData.append("title", data.title || "");
    formData.append("payer_name", data.payer_name || "");
    formData.append("payer_email", data.payer_email || "");
    formData.append("country", data.country || "");
    formData.append("due_date", data.due_date || "");
    formData.append("template_id", data.template_id || ""); // REQUIRED - only once, as string
    formData.append("service_fee", String(data.service_fee));
    formData.append("make_default", String(data.make_default));

    // ✅ Stringify invoice_items properly
    formData.append(
      "invoice_items",
      data.invoice_items ? JSON.stringify(data.invoice_items) : "[]",
    );

    // ✅ Handle logo file correctly
    if (data.logo && data.logo instanceof File) {
      formData.append("logo", data.logo, data.filename); // File object with filename
    }

    const response = await axiosAuth.post("/invoice", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // console.log("CREATE INVOICE RESPONSE:", response.data);
    return response.data;
  };

  return useMutation({
    mutationFn: handleCreateInvoice,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast.success(data.message || "Invoice created successfully");
      router.push(invoiceRoutes.INVOICES);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ?? "An unknown error occurred.";

      if (error.response?.status === 401) {
        toast.error("Unauthorized Access");
        logout();
        router.push(authRoutes.LOGIN);
      } else if (is_profile_complete) {
        toast.error(errorMessage);
      }

      // Log the error for debugging
      console.error("Invoice creation error:", error.response?.data);
    },
  });
};

export const useGetInvoices = ({
  order_by = "desc",
  // page = 1,
  page_count = 5,
  status = "all",
}: {
  order_by?: string;
  page?: number;
  page_count?: number;
  status?: string;
}) => {
  // const router = useRouter();
  const credentials = useAuthStore((state) => state.credentials);
  const { get } = useAxiosAuth();
  const { page } = useInvoiceFilter();
  // const { order_by, page, page_count, status } = useFetchInvoiceParams();

  const user_id = credentials?.user?.profile?.id;
  const handleGetInvoices = async () => {
    const params = new URLSearchParams();

    if (user_id) params.append("user_id", user_id);
    if (order_by) params.append("order_by", order_by);
    if (page_count) params.append("page_count", page_count.toString());
    // if (status) params.append("status", status);
    if (page) params.append("page", page.toString());

    const url = `/invoice?${params.toString()}`;
    // const url = `/invoice`;
    const res = await get(url);
    console.log(res);
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
  const credentials = useAuthStore((state) => state.credentials);
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
  const toast = useToast();
  const logout = useLogout();
  const { get } = useAxiosAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

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

      queryClient.invalidateQueries({ queryKey: ["invoice", "invoices"] });
      window.location.reload();
    },
    onError: (error) => {
      const errorMessage =
        axios.isAxiosError(error) && error?.response?.data?.message
          ? error?.response?.data?.message
          : "An unknown error occurred.";
      if (error.response?.status === 401) {
        toast.error("Unauthorized Access");
        router.push(authRoutes.LOGIN);
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
  const queryClient = useQueryClient();
  const toast = useToast();
  const handleSendInvoice = async () => {
    const url = `/invoice/review/${invoiceId}?approve=${approve}`;
    const response = await axiosInstance.get(url);
    return response.data;
  };

  const mutation = useMutation<
    InvoiceResponseType,
    AxiosError<InvoiceResponseType>,
    void
  >({
    mutationFn: handleSendInvoice,
    onSuccess: (data: InvoiceResponseType) => {
      toast.success(data.message);
      // This will invalidate all queries that start with ["client_invoice"]
      queryClient.invalidateQueries({
        queryKey: ["client_invoice"],
        exact: false, // This allows partial matching
      });
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
  const toast = useToast();
  const logout = useLogout();
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
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
      router.push(invoiceRoutes.INVOICES);

      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: (error) => {
      const errorMessage =
        axios.isAxiosError(error) && error?.response?.data?.message
          ? error?.response?.data?.message
          : "An unknown error occurred.";
      if (error.response?.status === 401) {
        toast.error("Unauthorized Access");
        router.push(authRoutes.LOGIN);
        logout();
      } else {
        toast.error(errorMessage);
      }
      console.log(error?.response);
    },
  });

  return mutation;
};
