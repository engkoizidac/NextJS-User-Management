import getAuthUser from "@/_controllers/getAuthUser.controller";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import UserNav from "./user-nav";
import { ThemeToggle } from "./theme-toggle";
import { getUserById } from "@/_dataAccessLayers/user.dal";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import SidebarClient from "./sidebar-client";
import Image from "next/image";

export async function NavBarComponent() {
  let authUser = null;
  let user = null;

  try {
    authUser = await getAuthUser();
    const userIdAsString = authUser?.userId?.toString();

    if (authUser && userIdAsString) {
      user = await getUserById(userIdAsString);
    }
  } catch (error) {
    console.error("Unable to load authenticated user data", error);
  }

  return (
    <header className="border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {authUser && (
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 hover:border-primary/40 transition-all duration-200"
                  >
                    <Menu className="h-5 w-5 text-foreground/80" />
                    <span className="sr-only">Open navigation</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[320px] p-0">
                  <SheetHeader className="px-4 py-3 border-b">
                    <SheetTitle className="text-lg font-semibold">
                      Navigation
                    </SheetTitle>
                  </SheetHeader>
                  <div className="p-4">
                    <SidebarClient />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}

          <Link href="/" className="flex items-center gap-3">
            {/*<div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent shadow-[0_0_30px_rgba(59,130,246,0.16)]">
              <div className="h-5 w-5 rounded-full border-2 border-primary/70" />
            </div> */}
            <div>
              <div className="flex justify-center">
                <h1 className="flex items-center text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
                  <span>PETR</span>

                  <Image
                    src="/logo.png"
                    alt="PetroFlow Logo"
                    width={34}
                    height={34}
                    className="-ml-0.5 -mr-0.5"
                  />

                  <span className="text-blue-500">FLOW</span>
                </h1>
              </div>

              <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">
                Gas Station Management
              </p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {authUser ? (
            <>
              <ThemeToggle />
              <UserNav user={user} />
            </>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
