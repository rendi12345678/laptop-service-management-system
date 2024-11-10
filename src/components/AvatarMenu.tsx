"use client"
import { type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { CreditCard, LogOut } from "lucide-react";

import { Avatar, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AvatarMenu(): ReactElement {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  // A helper to render menu items, improves readability for conditional rendering.
  const renderMenuItem = (
    onClick: () => void,
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
    label: string
  ) => (
    <DropdownMenuItem onClick={onClick}>
      <Icon className="mr-2 h-4 w-4" />
      <span>{label}</span>
    </DropdownMenuItem>
  );

  const handleAuthClick = () => {
    if (session) {
      signOut();
    } else {
      signIn("google"); // Initiates Google sign-in
    }
  };

  return (
    <div className="empty:hidden text-sm bg-background relative text-secondary-foreground rounded-full flex items-center justify-center size-9">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer size-full">
            <AvatarImage src={user?.image || "/default-avatar.png"} alt="User Avatar" />
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{session ? "My Account" : "Sign In"}</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* {session && ( */}
          {/*   <DropdownMenuGroup> */}
          {/*     {user?.role !== "admin" && */}
          {/*       renderMenuItem( */}
          {/*         () => router.push("/account/orders"), */}
          {/*         CreditCard, */}
          {/*         "Orders" */}
          {/*       )} */}
          {/*   </DropdownMenuGroup> */}
          {/* )} */}

          <DropdownMenuSeparator />
          {renderMenuItem(handleAuthClick, LogOut, session ? "Log out" : "Log in with Google")}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
