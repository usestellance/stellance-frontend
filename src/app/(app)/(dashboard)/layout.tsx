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
        <div className="min-h-screen flex-1 relative pt-20 pb-20">
          {children}
        </div>
      </div>
    </div>
  );
}
