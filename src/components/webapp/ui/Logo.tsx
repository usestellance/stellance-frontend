import Image from "next/image";
// import Link from "next/link";
import React from "react";

const Logo = ({
  height = "h-[34px] sm:h-10 md:h-[80px] lg:h-[113px]",
}: {
  height?: string;
}) => {
  return (
    <div className={`${height} inline-block`}>
      <Image
        src="/images/logo-dark.svg"
        alt="Stellance Logo"
        className="h-full w-full object-contain hidden dark:inline-block"
        height={100}
        width={100}
      />
      <Image
        src="/images/logo-light.svg"
        alt="Stellance Logo"
        className="h-full w-full object-contain inline-block dark:hidden"
        height={100}
        width={100}
      />
    </div>
  );
};

export default Logo;
