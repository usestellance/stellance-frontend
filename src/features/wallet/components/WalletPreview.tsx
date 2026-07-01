"use client";
// import React from "react";
import { useAuthStore } from "../../../store/userAuthStore";
// import { useGetWallet } from "../hooks";
import { IWallet } from "../../../types/walletType";
import { useToast } from "../../../hooks/useToast";
import { formatWalletCurrency, maskMiddle } from "../../../lib/utils/helpers";
import { RiFileCopyLine } from "react-icons/ri";
import WalletRadio from "./WalletRadio";
import { useWalletStore } from "../../../store/useWalletStore";
import RecentTransactions from "../../transactions/components/RecentTransactions";

const WalletPreview = () => {
	const toast = useToast();
	const credentials = useAuthStore((state) => state.credentials);
	// const { data } = useGetWallet();
	const { wallet } = useWalletStore();
	const walletDetails: IWallet = credentials?.user?.wallet || {};

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(walletDetails?.address || "");
			toast.success("Copied");
		} catch (err) {
			toast.error("Failed to copy URL");
			console.error(err);
		}
	};

	const balance = () => {
		// if (walletDetails?.balance?.usdc) {
		const balance =
			wallet === "$"
				? walletDetails?.balance?.usdc
				: walletDetails?.balance?.xlm;
		return balance;
		// } else {
		//   return walletDetails?.balance?.xlm;
		// }
	};

	return (
		<div className="max-w[1200px] mx-auto">
			<h2 className="h2-app">Wallet</h2>
			<section>
				{walletDetails?.address && (
					<button
						onClick={handleCopy}
						className="cursor-pointer flex items-center gap-1 text-primary-500 hover:text-primary-300 mt-1 md:mt-3 duration-150  "
					>
						<p className="text-xs md:text-lg font-medium  lg:text-2xl ">
							{maskMiddle(walletDetails?.address)}
						</p>
						<RiFileCopyLine className="text-sm md:text-2xl" />
					</button>
				)}
			</section>
			{/* Wallet Balance */}
			<section className="bg-primary-20 rounded-[5px] px-4 pt-2.5 pb-6 lg:rounded-[10px] mt-[34px] lg:pt-5 lg:pb-[33px] lg:mt-10 ">
				<div className="flex justify-end">
					<WalletRadio />
				</div>

				<div className="-mt-3">
					<p className="text-center text-sm lg:text-2xl">Total Balance</p>
					<h5 className="text-center font-bold text-2xl mt-1.5 lg:text-[40px] line-clamp-1">
						{" "}
						{formatWalletCurrency(balance() || 0, wallet) || "******"}
					</h5>
				</div>
			</section>
			{/* <section className="bg-primary-20 rounded-[5px] px-4 py-6 lg:rounded-[10px] mt-[34px] lg:pt-5 md:py-[33px] lg:mt-10 ">
        <h4 className="text-sm text-center md:text-xl">Wallet Address</h4>
        {walletDetails?.address && (
          <button
            onClick={handleCopy}
            className="cursor-pointer flex w-full justify-center items-center gap-1 text-primary-500 hover:text-primary-300  duration-150 mt-1 md:mt-3"
          >
            <p className="text-xl font-bold text-center lg:text-2xl ">
              {maskMiddle(walletDetails?.address)}
            </p>
            <RiFileCopyLine className="text-xl md:text-2xl" />
          </button>
        )}
      </section> */}

			<section className="mt-10 lg:mt-20">
				<RecentTransactions />
			</section>
		</div>
	);
};

export default WalletPreview;
