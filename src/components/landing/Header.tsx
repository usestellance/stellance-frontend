"use client";
import React, { useState } from "react";
import Logo from "./ui/Logo";
import { IoIosMenu } from "react-icons/io";
import Button from "./ui/Button";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { signInRoute, signUpRoute } from "../../../utils/route";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const gotoSignIn = () => {
    router.push(signInRoute);
  };
  const gotoSignUp = () => {
    router.push(signUpRoute);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff80] backdrop-blur">
      <div className="myContainer flex flex-row-reverse md:flex-row justify-between items-center py-4 sm:py-8 bgred-400">
        <Logo type="primary" />
        <IoIosMenu size={28} className="md:hidden" onClick={toggleMenu} />

        <div
          onClick={toggleMenu}
          className={`flex items-center gap-8 max-md:fixed max-md:h-[50vh] max-md:flex-col max-md:justify-center max-md:right-0 max-md:bg-white max-md:top-0 max-md:left-0 duration-150  ${
            isOpen ? "max-md:translate-0" : "max-md:-translate-y-[200%]"
          } `}
        >
          <IoClose size={28} className={`fixed top-10 right-10 md:hidden`} />
          <Link href="#" className="hover:scale-[1.1] duration-150">
            Solution
          </Link>
          <Link href="#" className="hover:scale-[1.1] duration-150">
            Products
          </Link>
          <Link href="#" className="hover:scale-[1.1] duration-150">
            Resources
          </Link>
        </div>

        <div className="md:flex justify-center items-center hidden ">
          <Button
            onClick={gotoSignUp}
            style="primary"
            type="button"
            className="py-2 px-6"
          >
            Sign up
          </Button>
          <Button
            onClick={gotoSignIn}
            style="tertiary"
            type="button"
            className="py-2 px-6"
          >
            Login
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
