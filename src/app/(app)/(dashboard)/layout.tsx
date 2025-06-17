import AppHeader from "../../../components/webapp/AppHeader";
import AppSideBar from "../../../components/webapp/AppSideBar";
// import PageLoading from "../../../components/webapp/PageLoading";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <AppHeader />
      <div className="md:h-screen flex justify-between">
        <AppSideBar />
        <div className="min-h-screen flex-1 relative pt-20 md:pt-24 pb-20 overflow-y-auto hide-scroll">
          {children}
        </div>
      </div>
    </div>
  );
}
