import { useRouter } from "next/navigation";
import React from "react";
import { MdArrowBack } from "react-icons/md";

export default function GoBack() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div
      onClick={goBack}
      className="w-fit flex items-center gap-1 cursor-pointer"
    >
      <MdArrowBack className="text-lg md:text-2xl" />
      <p className="text-lg font-semibold md:text-2xl">Back</p>
    </div>
  );
}
