import Logo from "../../../components/webapp/ui/Logo";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-5 pt-7 md:py-[60px] max-w-[1500px] mx-auto">
      <Logo />
      <div className="mt-[46px] relative max-w-[620px] mx-auto">{children}</div>
    </div>
  );
}
