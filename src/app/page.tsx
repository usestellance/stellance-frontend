import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Image
        src="/images/logo-primary.svg"
        alt="Stellance Logo"
        width={500}
        height={500}
      />
    </div>
  );
}
