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


