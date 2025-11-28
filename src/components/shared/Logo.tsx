import Image from "next/image";

const Logo = ({ height = "h-[30px]" }: { height?: string }) => {
  return (
    <div>
      <div className={`${height} w-fit bgred-400`}>
        <Image
          src="/images/logo-primary.svg"
          alt="Stellance Logo"
          width={100}
          height={100}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
};

export default Logo;
