import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster"
import AppProvider from "@/providers/AppProvider";
import "./globals.css";
import Providers from "./providers"
import { getSession } from "@/auth"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Servy",
  description: "Laptop Service Management",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession()

  return (
    <html lang="en">
      <AppProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Providers session={session}>
            <div className="w-svw">{children}</div>
            <Toaster />
          </Providers>
        </body>
      </AppProvider>
    </html>
  );
}
