"use client";
import Link from "next/link";
import Image from "next/image";
import { IoIosMenu } from "react-icons/io";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { authRoutes } from "../../config/routes";
import { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const gotoLogin = () => router.push(authRoutes.LOGIN);

  const gotoSignUp = () => router.push(authRoutes.SIGN_UP);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // ✅ Detect scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false); // scrolling down → hide
      } else {
        setIsVisible(true); // scrolling up → show
      }

      // ✅ Detect if page left top
      setIsScrolled(currentScrollY > 0);

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // <header className="text-neutral-500 py-4 md:py-5 fixed inset-x-0 top-0">
    <header
      className={`fixed inset-x-0 top-0 z-50  transition-all duration-300  py-4 md:py-5
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
        ${isScrolled ? "shadow-sm backdrop-blur-md bg-neutral-500 text-primary-500 " : "bg-transparent text-neutral-500"}
      `}
    >
      <div className="landing-container flex items-center justify-between gap-2 bg-gree-400">
        <Link href="/">
          <div className={`h-12 sm:h-16 md:h-20  w-fit bgred-400`}>
            {isScrolled ? (
              <Image
                src="/images/logo-primary-header.svg"
                alt="Stellance Logo"
                width={100}
                loading="eager"
                height={100}
                className="h-full w-full object-contain"
              />
            ) : (
              <Image
                src="/images/logo-white.svg"
                alt="Stellance Logo"
                width={100}
                loading="eager"
                height={100}
                className="h-full w-full object-contain"
              />
            )}
          </div>
        </Link>

        <div className="flex items-center justify-between gap-[60px] max-lg:hidden max-xl:gap-6">
          <nav className="bg-neutral-500/50 rounded-full px-8">
            <ul className="flex gap-6 items-center text-lg">
              <li className="p-2.5 font-medium hover:text-primary-500 duration-150">
                <Link href="#home" className=" w-full h-fit inline-block">
                  Home
                </Link>
              </li>
              <li className="p-2.5 font-medium hover:text-primary-500 duration-150">
                <Link href="/#about">About</Link>
              </li>
              <li className="p-2.5 font-medium hover:text-primary-500 duration-150">
                <Link href="/#features">Features</Link>
              </li>
              <li className="p-2.5 font-medium hover:text-primary-500 duration-150">
                <Link href="/#solutions">Solutions</Link>
              </li>
            </ul>
          </nav>

          <div className="flex gap-[30px] ">
            <Button
              variant="outline"
              onClick={gotoLogin}
              className={`w-fit min-w-40 ${isScrolled ? "border-primary-500" : "border-neutral-500"} h-14 hover:bg-neutral-500/50`}
            >
              Login
            </Button>
            <Button
              onClick={gotoSignUp}
              variant={isScrolled ? "default" : "secondary"}
              className="w-fit min-w-40"
            >
              Sign up for free
            </Button>
          </div>
        </div>
        <IoIosMenu className="text-4xl lg:hidden cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
