"use client";
import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";

const GoBack = () => {
  const router = useRouter();

  return <BiArrowBack onClick={() => router.back()} />;
};

export default GoBack;
