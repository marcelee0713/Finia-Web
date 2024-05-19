import { NavBar } from "@/components/nav";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full h-full">
      <NavBar />
      {children}
    </div>
  );
}
