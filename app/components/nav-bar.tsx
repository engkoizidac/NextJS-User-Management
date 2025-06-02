import * as React from "react";
import { logout } from "@/actions/auth";
import getAuthUser from "@/actions/getAuthUser";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
import { getUserMenus } from "@/lib/data-access/menu";

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

export async function NavBar() {
  const authUser = await getAuthUser();
  const userIdAsString = authUser?.userId?.toString();

  let menuTree: MenuMain[] = [];

  if (authUser) {
    if (!userIdAsString) {
      throw new Error("User ID is missing");
    }
    menuTree = await getUserMenus(userIdAsString);
  }

  //console.log(menuTree);

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
              {menuTree.map((mainMenu) => (
                <NavigationMenuItem key={mainMenu.id}>
                  {mainMenu.children.length > 0 ? (
                    <>
                      <NavigationMenuTrigger>
                        {mainMenu.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
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
                    >
                      {mainMenu.name}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
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
