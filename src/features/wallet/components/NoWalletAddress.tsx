"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../../../components/ui/button";
import { useGenerateWallet } from "../hooks";
import { useWalletStore } from "../../../store/useWalletStore";
import { useAuthStore } from "../../../store/userAuthStore";
import { authRoutes } from "../../../config/routes";
import { useRouter } from "next/navigation";
import { IWallet } from "../../../types/walletType";

const NoWalletAddress = () => {
  const router = useRouter();
  const credentials = useAuthStore((state) => state.credentials);
  const { mutate, isPending } = useGenerateWallet();
  
  const handleGenerateWallet = () => {
    if (credentials?.user?.profile_complete) {
      mutate();
    } else {
      router.push(authRoutes.COMPLETE_PROFILE);
    }
  };

  return (
    <div>
      <h2 className="h2-app">Wallet</h2>
      <div className="flex flex-col items-center mt-[108px]">
        <div className="w-full max-w-[300px] md:max-w-[500px]">
          <Image
            src="/images/no-wallet-address.svg"
            alt="No wallet illustration"
            height={500}
            width={500}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex justify-center w-full mt-5">
          <Button
            isLoading={isPending}
            disabled={isPending}
            onClick={handleGenerateWallet}
            className="max-w-[250px] md:max-w-[450px]"
          >
            Generate Wallet Address
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoWalletAddress;
