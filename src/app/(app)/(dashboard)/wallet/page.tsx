"use client";
import Image from "next/image";
import React from "react";
// import AppButton from "../../../../components/webapp/ui/AppButton";
// import { useGenerateWallet } from "../../../../hooks/useWallet";
// import { AiFillCopy } from "react-icons/ai";
// import { toast } from "sonner";

export default function Page() {
  // const handleCopy = async () => {
  //   try {
  //     await navigator.clipboard.writeText("");
  //     toast.success("Copied");
  //   } catch (err) {
  //     toast.error("Failed to copy URL");
  //     console.error(err);
  //   }
  // };

  return <NoWalletAddress />;
  // <div className="myContainer pt-5">
  //   <div>
  //     <h3 className="section-title max-[290px]:text-center">Wallet</h3>
  //     <div>
  //       <p></p>
  //       <button onClick={handleCopy} className="">
  //         <AiFillCopy className="" />
  //         <span className="max-md:hidden font-medium">Copy</span>
  //       </button>
  //     </div>
  //   </div>
  // </div>
}

function NoWalletAddress() {
  // const { mutate } = useGenerateWallet();

  return (
    <div className="myContainer h-full">
      <h3 className="section-title max-[290px]:text-center mt-5">Wallet</h3>
      <div className="-mt-10 sm:-mt-40 flex flex-col h-full justify-center items-center gap-11">
        <div className="w-[239px] md:w-[300px]">
          <Image
            src="/images/no-wallet-address.svg"
            alt="No wallet illustration"
            height={500}
            width={500}
            className="w-full h-full object-contain"
          />
        </div>
        {/* <AppButton onClick={} size="sm" className="">
          Generate Wallet Address
        </AppButton> */}
      </div>
    </div>
  );
}
