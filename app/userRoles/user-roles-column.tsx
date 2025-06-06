"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  LaptopMinimalCheck,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { format } from "date-fns";
import { EditRoleDialog } from "./dialogs/edit-role-dialog";
import { deleteRole } from "@/_controllers/role.controller";
import YesNoDialogDeleteRole from "./dialogs/confirm-delete-role-dialog";
import Link from "next/link";

function ActionsCell({ row }: { row: any }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmitSuccess = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleDelete = async () => {
    const result = await deleteRole(row.original.id);
    if (result.success) {
      toast.success("Role deleted successfully");
      router.refresh();
    } else {
      toast.error("Failed to delete role");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <div className="flex items-center">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <YesNoDialogDeleteRole
              onConfirm={handleDelete}
              roleName={row.original.name}
            >
              <div className="flex items-center">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </div>
            </YesNoDialogDeleteRole>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href={`/userRoles/${row.original.id}`}
              className="flex items-center w-full"
            >
              <LaptopMinimalCheck className="mr-2 h-4 w-4" />
              Access Privileges
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditRoleDialog
        open={open}
        onOpenChange={setOpen}
        onSubmitSuccess={handleSubmitSuccess}
        role={row.original}
      />
    </>
  );
}

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "User Role",
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
    cell: ({ row }) => {
      const value = row.getValue("createdAt");
      if (!value) return "";
      const date =
        typeof value === "string"
          ? new Date(value)
          : value instanceof Date
          ? value
          : undefined;
      return date instanceof Date && !isNaN(date.getTime())
        ? format(date, "yyyy-MM-dd @ HH:mm:ss")
        : "";
    },
  },
  {
    accessorKey: "updatedAt",
    header: "UpdatedAt",
    cell: ({ row }) => {
      const value = row.getValue("updatedAt");
      if (!value) return "";
      const date =
        typeof value === "string"
          ? new Date(value)
          : value instanceof Date
          ? value
          : undefined;
      return date instanceof Date && !isNaN(date.getTime())
        ? format(date, "yyyy-MM-dd @ HH:mm:ss")
        : "";
    },
  },
  {
    accessorKey: "id",
    header: "Actions",
    id: "actions",
    cell: ActionsCell,
  },
];
