import Image from "next/image";
import Link from "next/link";

const Logo = ({ height = "h-[30px]" }: { height?: string }) => {
  return (
    <Link href="/dashboard">
      <div className={`${height} w-fit bgred-400`}>
        <Image
          src="/images/logo-primary.svg"
          alt="Stellance Logo"
          width={100}
          loading="eager"
          height={100}
          className="h-full w-full object-contain"
        />
      </div>
    </Link>
  );
};

export default Logo;
