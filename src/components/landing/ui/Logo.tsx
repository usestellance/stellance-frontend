import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface LogoProps {
  type: "primary" | "secondary";
}

const Logo: FC<LogoProps> = ({ type }) => {
  return (
    <Link href="/" className="h-[22px] w-[121px] inline-block">
      <Image
        alt="Stellance logo"
        src={
          type === "primary" ? "/images/logo.svg" : "/images/secondary-logo.svg"
        }
        height={200}
        width={200}
        className="h-full w-full  object-contain"
      />
    </Link>
  );
};

export default Logo;
