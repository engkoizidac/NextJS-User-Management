import "./globals.css";
import { NavBarComponent } from "./components/nav-bar";
import { Geist } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  subsets: ["latin"],
  display: "optional",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className={`antialiased min-h-screen bg-background`}>
        <Toaster position="bottom-center" />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavBarComponent />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
