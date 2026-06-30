import getAuthUser from "@/_controllers/getAuthUser.controller";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import UserNav from "./user-nav";
import { ThemeToggle } from "./theme-toggle";
import { getUserById } from "@/_dataAccessLayers/user.dal";

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
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent shadow-[0_0_30px_rgba(59,130,246,0.16)]">
            <div className="h-5 w-5 rounded-full border-2 border-primary/70" />
          </div>
          <div>
            <p className="text-base font-semibold tracking-tight text-foreground">
              Oil Branch Inventory
            </p>
            <p className="text-xs text-muted-foreground">Operations hub</p>
          </div>
        </Link>

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
