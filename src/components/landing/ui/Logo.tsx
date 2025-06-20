import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface LogoProps {
  type: "primary" | "secondary";
  h?: string;
}

const Logo: FC<LogoProps> = ({
  type,
  h = "h-[22px] w-[121px]",
}) => {
  return (
    <Link href="/" className={`${h} inline-block`}>
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
