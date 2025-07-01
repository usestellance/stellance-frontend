import Logo from "../../../components/landing/ui/Logo";
import AppLogo from "../../../components/webapp/ui/Logo";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="myContainer pt-[20px] min-h-screen relative pb-20 md:pt-10 md:pb-40">
      <div className="max-w-[1200px] mx-auto ">
        <div className="flex justifybetween items-center">
          <div>
            <AppLogo />
          </div>

          <div className="mx-auto">
            <div className="block dark:hidden">
              <Logo type="primary" h="h-[17px] md:h-7" />
            </div>
            <div className="hidden dark:block">
              <Logo type="secondary" h="h-[17px] md:h-7" />
            </div>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
