"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loadMenuTree } from "@/redux/thunk/menuThunk";
import type { MenuGroupItem } from "@/_types/menu";
import {
  BarChart3,
  Blocks,
  Building2,
  ChevronRight,
  FileText,
  Fuel,
  LayoutDashboard,
  Package2,
  Settings,
  ShieldCheck,
  Truck,
  Users,
  Boxes,
} from "lucide-react";

const iconMap: Record<number, ReactNode> = {
  1: <LayoutDashboard className="h-4 w-4" />,
  2: <Building2 className="h-4 w-4" />,
  3: <Boxes className="h-4 w-4" />,
  4: <BarChart3 className="h-4 w-4" />,
  5: <Settings className="h-4 w-4" />,
};

const childIconMap = [
  <FileText className="h-3.5 w-3.5" key="file" />,
  <Fuel className="h-3.5 w-3.5" key="fuel" />,
  <Truck className="h-3.5 w-3.5" key="truck" />,
  <Package2 className="h-3.5 w-3.5" key="package" />,
  <ShieldCheck className="h-3.5 w-3.5" key="shield" />,
  <Users className="h-3.5 w-3.5" key="users" />,
];

export function SidebarComponent() {
  const dispatch = useAppDispatch();
  const menuTree = useAppSelector((state) => state.menu.items);
  const status = useAppSelector((state) => state.menu.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadMenuTree());
    }
  }, [dispatch, status]);

  return (
    <aside className="hidden w-72 shrink-0 border-r border-border/60 bg-background/70 p-4 backdrop-blur-xl lg:block">
      <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-background/95 via-background/80 to-muted/40 p-4 shadow-[0_0_40px_rgba(15,23,42,0.18)]">
        <div className="mb-4 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/12 to-transparent px-3 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
            Primary Navigation
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Move through branches, inventory, and operational reports.
          </p>
        </div>

        <nav className="space-y-2">
          {menuTree.map((menuGroup, index) => (
            <details
              key={menuGroup.id}
              className="group rounded-2xl border border-transparent bg-background/60 p-2 transition-all hover:border-primary/20 hover:bg-background/80"
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-2 py-2 text-sm font-medium text-foreground/90">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary">
                    {iconMap[menuGroup.id] ?? <Blocks className="h-4 w-4" />}
                  </div>
                  <span>{menuGroup.name}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-open:rotate-90" />
              </summary>

              {menuGroup.children.length > 0 ? (
                <div className="mt-2 space-y-1 border-l border-primary/10 pl-3">
                  {menuGroup.children.map((child, childIndex) => (
                    <Link
                      key={child.id}
                      href={child.link}
                      className="flex items-center gap-2 rounded-xl px-2 py-2 text-sm text-muted-foreground transition-all hover:bg-primary/10 hover:text-foreground"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-primary/10 bg-background/70 text-primary/70">
                        {childIconMap[childIndex % childIconMap.length]}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{child.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : null}
            </details>
          ))}
        </nav>
      </div>
    </aside>
  );
}
