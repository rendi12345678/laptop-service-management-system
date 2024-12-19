import { ReactNode, ReactElement } from "react";
import Sidebar from "@/components/dashboard/Sidebar"

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactElement {
  return (
    <div className="flex max-h-svh">
      <Sidebar />
      {children}
    </div>
  );
}
