import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import useAxiosAuth from "../../../hooks/useAxiosAuth";
import { useToast } from "../../../hooks/useToast";
import { useAuthStore, useLogout } from "../../../store/userAuthStore";
import { authRoutes } from "../../../config/routes";
import { useTransactionFilter } from "../../../store/useTransactionStore";

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
	const logout = useLogout();
	const toast = useToast();
	const axiousAuth = useAxiosAuth();
	const router = useRouter();
	const queryClient = useQueryClient();

	const handleCreateWallet = async () => {
		const response = await axiousAuth.post("/wallet");
		return response.data;
	};

	const mutation = useMutation<
		WalletResponseType,
		AxiosError<WalletResponseType>
	>({
		mutationFn: handleCreateWallet,
		onSuccess: (response) => {
			toast.success(response.message);
			window.location.reload();
			queryClient.invalidateQueries({ queryKey: ["user"] });
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

export const useGetWallet = () => {
	const credentials = useAuthStore((state) => state.credentials);
	const { get } = useAxiosAuth();

	const handleGetWallet = async () => {
		// const url = `/wallet/${wallet_id}`;
		// const url = `/wallet/971d45fb-35fd-470f-9d40-ad7d659956d9`;
		const url = `/wallet`;
		const res = await get(url);

		// console.log(res.data);
		// responseStatus(res.status, res.data, router);
		return res.data.data;
	};

	return useQuery({
		queryKey: ["wallet"],
		queryFn: handleGetWallet,
		enabled: !!credentials?.access_token,
		retry: 2,
		refetchOnWindowFocus: true,
	});
};

// TRANSACTIONS
// export const useGetTransactions = () => {
//   const { page, size, search, status, transaction_type, order_by } =
// 		useTransactionFilter();
//   const credentials = useAuthStore((state) => state.credentials);
//   const { get } = useAxiosAuth();

//   const handleGetTransactions = async () => {
//     // const url = `/wallet/${wallet_id}`;
//     // const url = `/wallet/971d45fb-35fd-470f-9d40-ad7d659956d9`;
//     const url = `/transaction`;
//     const res = await get(url);

//     console.log(res.data);
//     // responseStatus(res.status, res.data, router);
//     return res.data.data;
//   };

//   return useQuery({
// 		queryKey: [
// 			"transactions",
// 			page,
// 			size,
// 			search,
// 			status,
// 			transaction_type,
// 			order_by,
// 		],
// 		queryFn: handleGetTransactions,
// 		enabled: !!credentials?.access_token,
// 		retry: 2,
// 		refetchOnWindowFocus: true,
// 	});
// };
export const useGetTransactions = () => {
	const { page, size, search, status, transaction_type, order_by } =
		useTransactionFilter();

	const credentials = useAuthStore((state) => state.credentials);
	const { get } = useAxiosAuth();

	const handleGetTransactions = async () => {
		const params = new URLSearchParams();

		params.append("page", String(page));
		params.append("size", String(size));
		params.append("order_by", order_by);

		if (search) {
			params.append("search", search);
		}

		if (status !== "all") {
			params.append("status", status);
		}

		if (transaction_type !== "all") {
			params.append("transaction_type", transaction_type);
		}

		const { data } = await get(`/transaction?${params.toString()}`);

		return data.data;
	};

	return useQuery({
		queryKey: [
			"transactions",
			page,
			size,
			search,
			status,
			transaction_type,
			order_by,
		],
		queryFn: handleGetTransactions,
		enabled: !!credentials?.access_token,
		retry: 2,
		refetchOnWindowFocus: true,
	});
};

export const useGetTransaction = (transactionId?: string) => {
	const credentials = useAuthStore((state) => state.credentials);
	const { get } = useAxiosAuth();

	const handleGetTransaction = async () => {
		const { data } = await get(`/transaction/id/${transactionId}`);

		return data.data;
	};

	return useQuery({
		queryKey: ["transaction", transactionId],
		queryFn: handleGetTransaction,
		enabled: !!credentials?.access_token && !!transactionId,
		retry: 2,
		refetchOnWindowFocus: false,
	});
};
