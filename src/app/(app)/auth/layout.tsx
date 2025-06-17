// import PageLoading from "../../../components/webapp/PageLoading";
import Logo from "../../../components/webapp/ui/Logo";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-5 pt-7 pb-16 lg:pb-[60px] max-w-[1800px] mx-auto relative min-h-screen">
      <Logo height="h-[34px] md:h-[80px]" />
      {/* <PageLoading showLogo /> */}
      <div className="mt-10 relative max-w-[620px] mx-auto">{children}</div>
    </div>
  );
}
