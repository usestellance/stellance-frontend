"use client";
import Logo from "../components/shared/Logo";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";

export default function Notfound() {
  const router = useRouter();
  return (
    <div>
      <div className="custom-container">
        <div className="flex justify-center pt-5 md:pt-10 flex-col">
          <Logo height="h-[30px] md:h-[40px] lg:h-[72px]" />
          <p className="font-bold max-md:hidden lg:text-lg">Stellance</p>
        </div>
        <div className=" flex flex-col items-center mt-20 lg:mt-10 justify-center">
          <h1 className="text-center font-bold text-[64px] text-primary-500 lg:text-[128px]">
            404
          </h1>
          <p className="text-center font-light lg:text-[36px]">
            Sorry, the content you&apos;re looking for doesn&apos;t exist.
            <br className="max-lg:hidden" />
            Either it was removed, or you mistyped the link.
          </p>
          <Button onClick={() => router.back()} className="max-w-[500px] mt-10">
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
