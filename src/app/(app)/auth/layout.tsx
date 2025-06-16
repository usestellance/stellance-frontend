import Logo from "../../../components/webapp/ui/Logo";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-4 pt-4">
        <Logo  />
      <div>{children}</div>
    </div>
  );
}
