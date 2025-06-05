"use client";

import { DataTable } from "../../components/ui/data-table";

import { Input } from "@/components/ui/input";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { AddRoleDialog } from "./dialogs/add-role-dialog";
import { columns } from "./user-roles-column";

interface Roles {
  id: number;
  name: string;
}

export default function UserRoles({ Roles }: { Roles: Roles[] }) {
  const [searchRole, setSearchRole] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmitSuccess = useCallback(() => {
    router.refresh();
  }, [router]);

  // Filter availableRoles based on search
  const filteredUsers = Roles.filter((role: Roles) =>
    role.name.toLowerCase().includes(searchRole.toLowerCase())
  );

  return (
    <div className="container mx-auto py-2 px-2 sm:px-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 w-full">
          <Input
            placeholder="Search role here..."
            value={searchRole}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchRole(e.target.value)
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
                Add Role
              </div>
            </button>
            <AddRoleDialog
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
