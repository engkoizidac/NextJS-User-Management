import "./globals.css";
import { NavBar } from "./components/nav-bar";
import { Toaster } from "@/components/ui/toaster";
import { Geist } from "next/font/google";

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geistSans.className}>
      <body>
        <NavBar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
