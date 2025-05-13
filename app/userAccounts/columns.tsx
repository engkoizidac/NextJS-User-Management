"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import YesNoDialog from "./confirm-delete-user-dialog";
import { deleteUser } from "@/actions/userAccount";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  id: string;
  username: string;
  password: string;
  status: "Activated" | "Deactivated";
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<User>[] = [
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
    cell: ({ row }) => {
      const { toast } = useToast();

      const handleDelete = async () => {
        const result = await deleteUser(row.original.id);
        if (result.success) {
          toast({
            title: "Success",
            description: "User deleted successfully",
            variant: "success",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: result.error || "Failed to delete user",
          });
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <div className="flex items-center">
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <YesNoDialog
                onConfirm={handleDelete}
                userName={row.original.fullName}
              >
                <div className="flex items-center">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </div>
              </YesNoDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
