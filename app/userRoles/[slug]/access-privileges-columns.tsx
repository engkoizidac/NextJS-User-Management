"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

interface MenuMain {
  name: string;
}

interface MenuChild {
  name: string;
  menuMain: MenuMain;
}

interface AccessPrivilege {
  id: number;
  description: string;
  menu_child: MenuChild;
}

export const columns: ColumnDef<AccessPrivilege>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "menu",
    accessorFn: (row) => row.menu_child.menuMain.name,
    header: "Menu",
  },
  {
    id: "subMenu",
    accessorFn: (row) => row.menu_child.name,
    header: "Sub-menu",
  },
];
