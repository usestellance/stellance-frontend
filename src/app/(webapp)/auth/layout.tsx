import React from "react";
import Logo from "../../../components/shared/Logo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen flex overflow-hidden">
      <div className="bg-red500 overflow-y-auto hide-scroll relative custom-container sm:max-w-[600px] min-h-full w-full lg:w-1/2 pb-20">
        <div className=" bg-green400 py-5 max-sm:mb-5  md:py-10 xl:py-14 flex flex-col bg-geen-300 w-fit items-center">
          <Logo height="h-[30px] md:h-[40px]" />
          <p className="font-bold max-md:hidden">Stellance</p>
        </div>
        <div className="max-w-[500px] mx-auto">{children}</div>
      </div>
      <div className="max-lg:hidden w-1/2 bg-primary-20"></div>
    </main>
  );
}
