import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosAuth from "../../../hooks/useAxiosAuth";
import { useAuthStore, useLogout } from "../../../store/userAuthStore";
import { useToast } from "../../../hooks/useToast";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { authRoutes } from "../../../config/routes";
import { NotificationsItem } from "../../../types/notificationTypes";

export const useGetNotifications = () => {
  const credentials = useAuthStore((state) => state.credentials);
  const { get } = useAxiosAuth();

  const handleGetNotifications = async () => {
    const url = `/notification`;
    const res = await get(url);
    // console.log(res);
    return res.data.data;
  };

  return useQuery({
    queryKey: ["notifications"],
    queryFn: handleGetNotifications,
    enabled: !!credentials?.access_token,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateNotification = () => {
  const toast = useToast();
  const credentials = useAuthStore((state) => state.credentials);
  const logout = useLogout();
  const { patch } = useAxiosAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const is_profile_complete = credentials?.user?.profile_complete;

  // Define the function to handle the registration API call

  const handleUpdateNotification = async (notificationId?: string) => {
    const params = new URLSearchParams();

    params.append("viewed", "true");

    const url = `/notification/${notificationId}?${params.toString()}`;
    // const url = `/invoice`;
    const res = await patch(url);
    // console.log(res);
    return res.data.data;
  };

  // Use React Query's useMutation hook with additional configurations
  const mutation = useMutation<
    NotificationsItem,
    AxiosError<NotificationsItem>,
    string | undefined
    // CreateCommentPayload
  >({
    mutationFn: handleUpdateNotification,
    onSuccess: (data: NotificationsItem) => {
      //   console.log(data);

      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.info("Notification read");
      // router.push(invoiceRoutes.INVOICES);
      // window.location.reload()
    },
    onError: (error) => {
      const errorMessage =
        axios.isAxiosError(error) &&
        error?.response?.data &&
        "message" in error.response.data
          ? (error.response.data as any).message
          : "An unknown error occurred.";
      if (error.response?.status === 401) {
        toast.error("Unauthorized Access");
        router.push(authRoutes.LOGIN);
        logout();
      } else {
        if (is_profile_complete) {
          toast.error(errorMessage);
        }
      }
      // console.log(error?.response);
    },
  });

  // Return the mutation object to use in components
  return mutation;
};

export const useDeleteNotification = () => {
  const toast = useToast();
  const credentials = useAuthStore((state) => state.credentials);
  const logout = useLogout();
  const { patch } = useAxiosAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const is_profile_complete = credentials?.user?.profile_complete;

  // Define the function to handle the registration API call

  const handleDeleteNotification = async (notificationId?: string) => {
    const params = new URLSearchParams();


    const url = `/notification/${notificationId}`

    const res = await patch(url);
    // console.log(res);
    return res.data.data;
  };

  // Use React Query's useMutation hook with additional configurations
  const mutation = useMutation<
    NotificationsItem,
    AxiosError<NotificationsItem>,
    string | undefined
    // CreateCommentPayload
  >({
    mutationFn: handleDeleteNotification,
    onSuccess: (data: NotificationsItem) => {
      //   console.log(data);

      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.info("Notification Deleted");
      // router.push(invoiceRoutes.INVOICES);
      // window.location.reload()
    },
    onError: (error) => {
      const errorMessage =
        axios.isAxiosError(error) &&
        error?.response?.data &&
        "message" in error.response.data
          ? (error.response.data as any).message
          : "An unknown error occurred.";
      if (error.response?.status === 401) {
        toast.error("Unauthorized Access");
        router.push(authRoutes.LOGIN);
        logout();
      } else {
        if (is_profile_complete) {
          toast.error(errorMessage);
        }
      }
      // console.log(error?.response);
    },
  });

  // Return the mutation object to use in components
  return mutation;
};
