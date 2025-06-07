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

import { clearUserPassword, deleteUser } from "@/_controllers/user.controller";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { EditUserDialog } from "./dialogs/edit-user-dialog";
import { useCallback, useState } from "react";
import { format } from "date-fns";
import YesNoDialogDeleteUser from "./dialogs/confirm-delete-user-dialog";
import YesNoDialogClearPassword from "./dialogs/confirm-clear-password-dialog";
import Link from "next/link";

function ActionsCell({ row }: { row: any }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmitSuccess = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleDelete = async () => {
    const result = await deleteUser(row.original.id);
    if (result.success) {
      toast.success("User deleted successfully");
      router.refresh();
    } else {
      toast.error("Failed to delete user");
    }
  };

  const handleClearPassword = async () => {
    const result = await clearUserPassword(row.original.id);
    if (result.success) {
      toast.success("User password successfully cleared");
      router.refresh();
    } else {
      toast.error("Failed to clear user password");
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
            <YesNoDialogDeleteUser
              onConfirm={handleDelete}
              userName={row.original.fullName}
            >
              <div className="flex items-center">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </div>
            </YesNoDialogDeleteUser>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <YesNoDialogClearPassword
              onConfirm={handleClearPassword}
              userName={row.original.fullName}
            >
              <div className="flex items-center">
                <Trash className="mr-2 h-4 w-4" />
                Clear Password
              </div>
            </YesNoDialogClearPassword>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href={`/userAccounts/${row.original.id}`}
              className="flex items-center w-full"
            >
              <LaptopMinimalCheck className="mr-2 h-4 w-4" />
              Assigned Roles
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditUserDialog
        open={open}
        onOpenChange={setOpen}
        onSubmitSuccess={handleSubmitSuccess}
        user={row.original}
      />
    </>
  );
}

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "fullName",
    header: "Name of User",
  },
  {
    accessorKey: "username",
    header: "Username",
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      const statusMap: Record<string, { text: string; classes: string }> = {
        Activated: {
          text: "Activated",
          classes: "bg-green-100 text-green-800",
        },
        Deactivated: {
          text: "Deactivated",
          classes: "bg-gray-100 text-gray-800",
        },
      };

      const { text, classes } = statusMap[status] || {
        text: status,
        classes: "bg-muted text-muted-foreground",
      };

      return (
        <span
          className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${classes}`}
        >
          {text}
        </span>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Actions",
    id: "actions",
    cell: ActionsCell,
  },
];
