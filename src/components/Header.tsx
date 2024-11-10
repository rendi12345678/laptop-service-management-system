import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "@/components/ui/sheet";
import BaseContainer from "@/components/BaseContainer";
import SignInLink from "./SignInLink";
import AvatarMenu from "./AvatarMenu";
// import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <BaseContainer className="flex items-center justify-between py-6 bg-secondary">
      <Link href="#" className="flex items-center gap-2" prefetch={false}>
        <span className="text-2xl font-semibold">Homestay</span>
      </Link>
      <div className="hidden md:flex gap-4">
        <Link href="#" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
          Home
        </Link>
        <Link href="#" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
          About
        </Link>
        <Link href="#" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
          Services
        </Link>
        <Link href="#" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
          Portfolio
        </Link>
        <Link href="#" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
          Contact
        </Link>
      </div>
      <Sheet>
        <AvatarMenu />
        <SignInLink />
        <SheetTrigger asChild className="md:hidden">
          <div className="cursor-pointer">
            <RxHamburgerMenu className="text-4xl" />
            {/* <Link href="/admin/dashboard" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}> */}
            {/*   Dashboard */}
            {/* </Link> */}
            <span className="sr-only">Toggle navigation menu</span>
          </div>
        </SheetTrigger>
        <SheetContent side="left">
          <VisuallyHidden.Root>
            <SheetTitle>
              Menu
            </SheetTitle>
          </VisuallyHidden.Root>
          <div className="grid w-[200px] p-4">
            <Link href="#" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
              Home
            </Link>
            <Link href="#" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
              About
            </Link>
            <Link href="#" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
              Services
            </Link>
            <Link href="#" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
              Portfolio
            </Link>
            <Link href="#" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
              Contact
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </BaseContainer>
  );
}

// function MenuIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <line x1="4" x2="20" y1="12" y2="12" />
//       <line x1="4" x2="20" y1="6" y2="6" />
//       <line x1="4" x2="20" y1="18" y2="18" />
//     </svg>
//   );
// }
