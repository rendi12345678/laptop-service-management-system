"use client"
import { ReactNode, type ReactElement } from "react";
import useAppContext from "@/hooks/useAppContext";
import { RxHamburgerMenu } from "react-icons/rx";

export interface DashboardTitleProps {
  children: ReactNode;
}

export default function DashboardTitle({
  children,
}: DashboardTitleProps): ReactElement {
  const { toggleSidebar } = useAppContext();

  return <h2 className="flex items-center gap-6 m-0 p-0">
    <span
      className="h-7 text-4xl w-9 cursor-pointer"
      onClick={toggleSidebar}
    >
      <RxHamburgerMenu />
    </span>
    {children}</h2>;
}
