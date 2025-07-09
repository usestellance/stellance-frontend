"use client";
import Image from "next/image";
import React from "react";
import AppButton from "../../../../components/webapp/ui/AppButton";
import { useGenerateWallet, useGetWallet } from "../../../../hooks/useWallet";
import { userAuth } from "../../../../store/userAuth";
import { toast } from "sonner";
import { RiFileCopyLine } from "react-icons/ri";
import {
  formatWalletCurrency,
  maskMiddle,
} from "../../../../utils/helpers/helperFunctions";
import WalletRadio from "../../../../components/webapp/WalletRadio";
import { useVariableStore } from "../../../../store/variables";
import { IWallet } from "../../../../lib/types/walletType";
import { useRouter } from "next/navigation";
import { accountSetUpRoute } from "../../../../utils/route";

export default function Page() {
  const router = useRouter();
  const { wallet } = useVariableStore();
  const { credentials } = userAuth();
  const { mutate, isPending } = useGenerateWallet();
  const { data } = useGetWallet(
    credentials?.user?.wallet?.id?.toString() || ""
  );
  const walletDetails: IWallet = data;
  const handleGenerateWallet = () => {
    if (credentials?.profile_complete) {
      mutate();
    } else {
      router.push(accountSetUpRoute);
    }
  };
  const balance = () => {
    if (walletDetails?.balance?.usdc) {
      const balance =
        wallet === "$"
          ? walletDetails?.balance?.usdc
          : walletDetails?.balance?.xlm;
      return balance;
    } else {
      return walletDetails?.balance?.xlm;
    }
  };

  console.log(credentials);
  console.log(walletDetails);

  function NoWalletAddress() {
    return (
      <div className="myContainer h-full">
        <h3 className="section-title max-[290px]:text-center mt-5">Wallet</h3>
        <div className="-mt-10 flex flex-col h-full justify-center items-center gap-11">
          <div className="w-[239px] md:w-[300px]">
            <Image
              src="/images/no-wallet-address.svg"
              alt="No wallet illustration"
              height={500}
              width={500}
              className="w-full h-full object-contain"
            />
          </div>
          <AppButton
            loading={isPending}
            disabled={isPending}
            onClick={handleGenerateWallet}
            size="sm"
            className="md:w-full md:max-w-md"
          >
            Generate Wallet Address
          </AppButton>
        </div>
      </div>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(walletDetails?.wallet_address);
      toast.success("Copied");
    } catch (err) {
      toast.error("Failed to copy URL");
      console.error(err);
    }
  };

  if (!credentials?.user.wallet?.id) return <NoWalletAddress />;

  return (
    <div className="myContainer pt-5">
      <div>
        <h3 className="section-title max-[290px]:text-center">Wallet</h3>
        <div className="">
          {walletDetails?.wallet_address && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-primary dark:text-white mt-1 md:mt-3"
            >
              <p className="text-xs md:text-lg font-medium  lg:text-2xl ">
                {maskMiddle(walletDetails?.wallet_address)}
              </p>
              <RiFileCopyLine className="text-sm md:text-2xl" />
            </button>
          )}
        </div>

        <div className="bg-primary-light/40 p-[10px] pb-6 rounded-[5px] mt-9 md:mt-11 min-h-[100px] md:min-h-[130px] md:p-5 md:pb-[28px]">
          <div className="flex justify-end">
            {walletDetails?.balance?.usdc && <WalletRadio />}
          </div>
          <div className="flex flex-col items-center gap-[6px]">
            <h4 className="text-sm md:text-lg lg:text-2xl">Total Balance</h4>
            <h4 className="text-xl text-[#333333] font-bold md:text-[40px]">
              {formatWalletCurrency(balance() || 0, wallet)}
            </h4>
          </div>
        </div>
        <div className="mt-[60px]">
          <h4 className="text-sm font-bold md:text-2xl">Recent Transactions</h4>
          <div className="flex flex-col items-center mt-10 gap-4">
            <div className="w-[150px] md:w-[200px]">
              <Image
                src="/images/no-wallet-address.svg"
                alt="No wallet illustration"
                height={500}
                width={500}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="font-bold text-sm md:text-2xl">
              No recent transactions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
