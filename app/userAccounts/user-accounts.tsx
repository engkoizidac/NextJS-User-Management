"use client";

import { DataTable } from "../../components/ui/data-table";

import { Input } from "@/components/ui/input";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { AddUserDialog } from "./dialogs/add-user-dialog";
import { columns } from "./user-accounts-columns";

interface Users {
  id: string;
  fullName: string;
}

export default function UserAccounts({ Users }: { Users: Users[] }) {
  const [searchUser, setSearchUser] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmitSuccess = useCallback(() => {
    router.refresh();
  }, [router]);

  // Filter availableRoles based on search
  const filteredUsers = Users.filter((user: Users) =>
    user.fullName.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div className="container mx-auto py-2 px-2 sm:px-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 w-full">
          <Input
            placeholder="Search user here..."
            value={searchUser}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchUser(e.target.value)
            }
            className="w-full max-w-sm h-11"
          />
          <div className="flex items-center justify-end w-full sm:w-auto mt-2 sm:mt-0">
            <button
              className="text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
              onClick={() => setOpen(true)}
            >
              <div className="flex items-center justify-center">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add User
              </div>
            </button>
            <AddUserDialog
              open={open}
              onOpenChange={setOpen}
              onSubmitSuccess={handleSubmitSuccess}
            />
          </div>
        </div>
        <div>
          <DataTable
            columns={columns}
            data={filteredUsers}
            key={Date.now()} // Force re-render on data changes
          />
        </div>
      </div>
    </div>
  );
}
