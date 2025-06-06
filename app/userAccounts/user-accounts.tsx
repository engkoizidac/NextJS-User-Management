"use client";

import { DataTable } from "../../components/ui/data-table";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { AddUserDialog } from "./dialogs/add-user-dialog";
import { columns } from "./user-accounts-columns";
import { ToolbarWithSearchAndAction } from "../components/toolbar-with-search";
import { User } from "@/_types/user";

export default function UserAccounts({ users }: { users: User[] }) {
  const [searchUser, setSearchUser] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Callback to handle successful form submission and refresh the page
  const handleSubmitSuccess = useCallback(() => {
    router.refresh();
  }, [router]);

  // Filter availableRoles based on search
  const filteredUsers = users.filter((user: User) =>
    user.fullName.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div className="container mx-auto py-2 px-2 sm:px-4">
      <div className="flex flex-col gap-4">
        {/* Toolbar with search and action button */}
        <ToolbarWithSearchAndAction
          searchValue={searchUser}
          onSearchChange={(e) => setSearchUser(e.target.value)}
          searchPlaceholder="Search user here..."
          actionLabel="Add User"
          actionIcon={<PlusCircle className="mr-2 h-4 w-4" />}
          onActionClick={() => setOpen(true)}
        >
          <AddUserDialog
            open={open}
            onOpenChange={setOpen}
            onSubmitSuccess={handleSubmitSuccess}
          />
        </ToolbarWithSearchAndAction>
        <div>
          {/* Render the data table*/}
          <DataTable columns={columns} data={filteredUsers} key={Date.now()} />
        </div>
      </div>
    </div>
  );
}
