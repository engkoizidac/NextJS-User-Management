"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { AccessPrivilege } from "@/_types/accessPrivileges";

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
    accessorKey: "menu_child.menuMain.name",
    header: "Menu",
  },
  {
    accessorKey: "menu_child.name",
    header: "Sub-menu",
  },
];
