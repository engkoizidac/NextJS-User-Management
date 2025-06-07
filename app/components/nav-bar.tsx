import * as React from "react";
import getAuthUser from "@/_controllers/getAuthUser.controller";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { getUserMenus } from "@/_dataAccessLayers/menu.dal";
import UserNav from "./user-nav";
import { ThemeToggle } from "./theme-toggle";
import { getUserById } from "@/_dataAccessLayers/user.dal";

interface MenuChild {
  id: number;
  name: string;
  link: string;
  description: string;
}

interface MenuMain {
  id: number;
  name: string;
  children: MenuChild[];
}

interface User {
  id: string;
  fullName: string;
}

export async function NavBarComponent() {
  const authUser = await getAuthUser();
  const userIdAsString = authUser?.userId?.toString();

  let user = null;
  let menuTree: MenuMain[] = [];

  if (authUser) {
    if (!userIdAsString) {
      throw new Error("User ID is missing");
    }
    menuTree = await getUserMenus(userIdAsString);
    user = await getUserById(userIdAsString);
  }

  return (
    <nav className="py-3 md:py-5 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* Mobile menu */}
      {authUser && (
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 hover:border-primary/40 hover:from-primary/20 hover:via-primary/10 hover:to-primary/5 transition-all duration-300 group overflow-hidden"
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

                {/* Menu icon with animation */}
                <div className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-180">
                  <Menu className="h-5 w-5 text-foreground/80 group-hover:text-primary transition-colors duration-300" />
                </div>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-xl border border-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Ripple effect */}
                <div className="absolute inset-0 rounded-xl bg-primary/10 scale-0 group-active:scale-100 transition-transform duration-150" />

                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] sm:w-[350px] p-0 bg-gradient-to-br from-background via-background to-muted/20"
            >
              <SheetHeader className="px-6 py-4 border-b bg-gradient-to-r from-primary/5 to-primary/10">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <Menu className="h-4 w-4 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Navigation
                  </h2>
                </div>
              </SheetHeader>

              <div className="py-6 space-y-2 px-4 max-h-[calc(100vh-120px)] overflow-y-auto">
                {menuTree.map((mainMenu, index) => (
                  <div
                    key={mainMenu.id}
                    className="group animate-in slide-in-from-left duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      <div className="relative p-3 rounded-lg border border-transparent group-hover:border-primary/20 transition-all duration-200">
                        <h3 className="font-semibold text-base flex items-center gap-2 text-foreground group-hover:text-primary transition-colors">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-60 group-hover:opacity-100 transition-opacity" />
                          {mainMenu.name}
                        </h3>

                        {mainMenu.children.length > 0 && (
                          <div className="mt-3 pl-4 space-y-1 border-l-2 border-gradient-to-b from-primary/20 to-transparent">
                            {mainMenu.children.map((child, childIndex) => (
                              <Link
                                key={child.id}
                                href={child.link}
                                className="group/item flex items-center gap-3 py-2.5 px-3 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 transition-all duration-200 animate-in slide-in-from-left"
                                style={{
                                  animationDelay: `${
                                    index * 100 + childIndex * 50 + 200
                                  }ms`,
                                }}
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 group-hover/item:bg-primary group-hover/item:scale-125 transition-all duration-200" />
                                <span className="flex-1">{child.name}</span>
                                <div className="w-4 h-4 rounded border border-muted-foreground/20 group-hover/item:border-primary/50 group-hover/item:bg-primary/10 transition-all duration-200 flex items-center justify-center">
                                  <div className="w-1 h-1 rounded-full bg-muted-foreground/40 group-hover/item:bg-primary transition-colors duration-200" />
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Decorative bottom element */}
                <div className="mt-8 pt-6 border-t border-gradient-to-r from-transparent via-border to-transparent">
                  <div className="flex justify-center">
                    <div className="w-12 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full" />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}

      <div className="flex items-center gap-4 md:gap-10">
        <Link href="/" className="flex-shrink-0">
          <h1 className="text-2xl md:text-3xl font-semibold">
            User<span className="text-blue-500">Auth</span>
          </h1>
        </Link>
      </div>

      {/* Desktop navigation */}
      {authUser ? (
        <div className="hidden md:flex md:flex-1 pl-6 lg:pl-12">
          {" "}
          {/* Increased padding-left for desktop */}
          <NavigationMenu>
            <NavigationMenuList>
              {menuTree.map((mainMenu) => (
                <NavigationMenuItem key={mainMenu.id}>
                  {mainMenu.children.length > 0 ? (
                    <>
                      <NavigationMenuTrigger>
                        {mainMenu.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-4 p-6 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {/* Increased gap and padding here */}
                          {mainMenu.children.map((child) => (
                            <ListItem
                              key={child.id}
                              title={child.name}
                              href={child.link}
                            >
                              {child.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink
                      key={mainMenu.id}
                      className={navigationMenuTriggerStyle()}
                      asChild
                    >
                      <Link href="#">{mainMenu.name}</Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      ) : null}

      <div className="flex items-center gap-3">
        {" "}
        {/* Slightly increased gap */}
        {authUser ? (
          <div className="flex items-center gap-3">
            {" "}
            {/* Slightly increased gap */}
            <ThemeToggle />
            <UserNav user={user} />
          </div>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
