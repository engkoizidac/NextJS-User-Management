import "./globals.css";
import { NavBarComponent } from "./components/nav-bar";
import { SidebarComponent } from "./components/sidebar";
import { Geist } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";
import getAuthUser from "@/_controllers/getAuthUser.controller";

const geistSans = Geist({
  subsets: ["latin"],
  display: "optional",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authUser = await getAuthUser();

  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_32%),linear-gradient(135deg,_rgba(15,23,42,0.98),_rgba(2,6,23,1))] text-foreground antialiased">
        <Toaster position="bottom-center" />
        <Providers>
          <div className="flex min-h-screen flex-col">
            <NavBarComponent />
            <div className="flex flex-1">
              {authUser ? <SidebarComponent /> : null}
              <main className="flex-1 min-w-0 px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-7xl">{children}</div>
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
