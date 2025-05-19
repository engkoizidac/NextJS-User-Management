import * as React from "react";
import { logout } from "@/actions/auth";
import getAuthUser from "@/actions/getAuthUser";
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
import { cn } from "@/lib/utils";

const adminLinks = [
  {
    title: "User Accounts",
    href: "/userAccounts",
    description: "Add, edit, and delete user accounts and manage their roles.",
  },
  {
    title: "User Role Management",
    href: "/userRoles",
    description: "Manage user assigned roles and their permissions.",
  },
];

const adminLinks2 = [
  {
    title: "User Accounts",
    href: "/userAccounts",
    description: "Add, edit, and delete user accounts and manage their roles.",
  },
  {
    title: "User Role Management",
    href: "/userRoles",
    description: "Manage user assigned roles and their permissions.",
  },
];

export async function NavBar() {
  const authUser = await getAuthUser();
  return (
    <nav className="py-5 flex items-center justify-between sm:px-2 lg:px-4">
      <div className="flex items-center gap-10 ">
        <Link href="/">
          <h1 className="text-3xl font-semibold justify-between">
            User<span className="text-fuchsia-800">Auth</span>
          </h1>
        </Link>
      </div>

      {authUser ? (
        <div className="hidden md:flex md:flex-1 pl-10">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/"
                  className={navigationMenuTriggerStyle()}
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/dashboard"
                  className={navigationMenuTriggerStyle()}
                >
                  Dashboard
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Settings</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {adminLinks.map((subMenus) => (
                      <ListItem
                        key={subMenus.title}
                        title={subMenus.title}
                        href={subMenus.href}
                      >
                        {subMenus.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      ) : null}

      <div className="flex items-center gap-4">
        <div className="flex gap-4">
          {authUser ? (
            <form action={logout}>
              <Button variant="secondary">Logout</Button>
            </form>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
