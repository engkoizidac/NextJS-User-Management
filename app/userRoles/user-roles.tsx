"use client";

import { DataTable } from "../../components/ui/data-table";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { AddRoleDialog } from "./dialogs/add-role-dialog";
import { columns } from "./user-roles-column";
import { ToolbarWithSearchAndAction } from "../components/toolbar-with-search";

interface Roles {
  id: number;
  name: string;
}

export default function UserRoles({ Roles }: { Roles: Roles[] }) {
  const [searchRole, setSearchRole] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Callback to handle successful form submission and refresh the page
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
        {/* Toolbar with search and action button */}
        <ToolbarWithSearchAndAction
          searchValue={searchRole}
          onSearchChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchRole(e.target.value)
          }
          searchPlaceholder="Search role here..."
          actionLabel="Add Role"
          actionIcon={<PlusCircle className="mr-2 h-4 w-4" />}
          onActionClick={() => setOpen(true)}
        >
          <AddRoleDialog
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
