import React from "react";
import Logo from "./ui/Logo";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import Link from "next/link";

export default function Footer() {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="bg-primary pt-20 pb-10 min-h-[50vh]">
      <div className="myContainer text-text-white">
        <div className="flex max-[390px]:justify-center items-center">
          <Logo type="secondary" />
        </div>
        <div className=" flex justify-between gap-20 mt-11 flex-wrap">
          <div className="flex-1">
            <p className="w-5/6 min-w-[200px] max-[390px]:text-center max-[390px]:mx-auto">
              Stellance partners with trusted payment networks to offer fiat
              off-ramps in supported regions
            </p>
          </div>
          <div className="flex-1 bggreen-300 flex justify-center">
            <div className="flex flex-col gap-8">
              <div className="">Solution</div>
              <div className="">Products</div>
              <div className="">Resources</div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="flex flex-col gap-8 max-[390px]:items-center">
              <div className="">CONTACT US</div>

              <div>
                <Link href="/" className="">
                  info@stellance.com
                </Link>
                <div className="flex gap-4 mt-3 max-[390px]:justify-center">
                  <Link
                    href="/"
                    className="rounded-sm h-6 w-6 border border-text-white flex justify-center items-center hover:bg-text-white hover:text-primary duration-150"
                  >
                    <FaInstagram size={18} />
                  </Link>
                  <Link
                    href="/"
                    className="rounded-sm h-6 w-6 border border-text-white flex justify-center items-center hover:bg-text-white hover:text-primary duration-150"
                  >
                    <FaXTwitter size={24} />
                  </Link>
                  <Link
                    href="/"
                    className="rounded-sm h-6 w-6 border border-text-white flex justify-center items-center hover:bg-text-white hover:text-primary duration-150"
                  >
                    <CiLinkedin size={24} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-40">
          Copyright &copy; Stellance Inc. {currentYear ?? "2025"}. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
