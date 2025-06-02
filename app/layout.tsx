import "./globals.css";
import { NavBar } from "./components/nav-bar";
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
      <body className={`antialiased`}>
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000, // Toasts will auto-close after 2 seconds
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
