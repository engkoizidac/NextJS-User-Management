"use client";

import { ArrowBigLeft, PlusCircle, MinusCircle } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState, startTransition } from "react";
import { useActionState } from "react";
import {
  assignRolesAction,
  unAssignRolesAction,
} from "@/actions/userRoleController";
import { useRouter } from "next/navigation";

import Icons from "@/components/ui/icons";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table-with-select";

type User = {
  id: string;
  fullName: string;
};

type Role = {
  id: number;
  name: string;
};

export default function AccessPrivilegesPage({
  user,
  availableRoles,
  assignedRoles,
}: {
  user: User | null;
  availableRoles: Role[];
  assignedRoles: Role[];
}) {
  const router = useRouter();
  const [selectedAvailableRoles, setSelectedAvailableRoles] = useState<Role[]>(
    []
  );
  const [selectedAssignedRoles, setSelectedAssignedRoles] = useState<Role[]>(
    []
  );

  const [searchAvailableRole, setSearchAvailableRole] = useState("");
  const [searchAssignedRole, setSearchAssignedRole] = useState("");

  const [assignState, assignRolesActionState, isAssigningPending] =
    useActionState(
      async (state: any, assignments: { userId: string; roleId: number }[]) => {
        return await assignRolesAction(assignments);
      },
      null
    );

  const [unAssignState, unAssignRolesActionState, isUnAssigningPending] =
    useActionState(
      async (state: any, assignments: { userId: string; roleId: number }[]) => {
        return await unAssignRolesAction(assignments);
      },
      null
    );

  const assignRoles = () => {
    if (!user?.id) {
      throw new Error("User ID is required to assign roles.");
    }
    const selectedAvailableAssignments = selectedAvailableRoles.map((role) => ({
      userId: user?.id,
      roleId: role.id,
    }));
    startTransition(() => {
      assignRolesActionState(selectedAvailableAssignments);
      router.refresh();
    });
  };

  useEffect(() => {
    if (assignState?.success || unAssignState?.success) {
      setSelectedAvailableRoles([]);
      setSelectedAssignedRoles([]);
      setSearchAvailableRole("");
      setSearchAssignedRole("");
    }
  }, [assignState?.success, unAssignState?.success]);

  const unassignRoles = () => {
    if (!user?.id) {
      throw new Error("User ID is required to assign roles.");
    }

    const selectedAssignedAssignments = selectedAssignedRoles.map((role) => ({
      userId: user?.id,
      roleId: role.id,
    }));
    startTransition(() => {
      unAssignRolesActionState(selectedAssignedAssignments);
      router.refresh();
    });
  };

  // Filter availableRoles based on search
  const filteredAvailableRoles = availableRoles.filter((role: any) =>
    role.name.toLowerCase().includes(searchAvailableRole.toLowerCase())
  );

  const filteredAssignedRoles = assignedRoles.filter((role: any) =>
    role.name.toLowerCase().includes(searchAssignedRole.toLowerCase())
  );

  return (
    <div className="justify-center items-center ">
      <div className="container mx-auto py-8 ">
        <div className="flex  items-center justify-between">
          <div className="flex font-bold text-2xl">
            Role Management:
            <span className="text-fuchsia-800">&nbsp;{user?.fullName}</span>
          </div>
          <div className="flex  justify-end">
            <Link href={`/userAccounts`} className="flex items-center w-full">
              <button className="text-sm  bg-fuchsia-900 text-white px-4 py-2 rounded hover:bg-fuchsia-950">
                <div className="flex items-center">
                  <ArrowBigLeft className="mr-2 h-5 w-5" />
                  Back to User Accounts
                </div>
              </button>
            </Link>
          </div>
        </div>
        <div className="text-fuchsia-950">
          Assign and manage user roles in your organization
        </div>
      </div>

      <div className="container mx-auto animate-in fade-in duration-500">
        <div className="hidden md:grid md:grid-cols-2 md:gap-6">
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle>Available Roles</CardTitle>
              <CardDescription>
                Roles that can be assigned to users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Button
                  onClick={assignRoles}
                  disabled={
                    selectedAvailableRoles.length === 0 || isAssigningPending
                  }
                  className="w-full sm:w-auto transition-all duration-200 flex items-center gap-2"
                >
                  {isAssigningPending ? (
                    <>
                      <Icons.spinner className="animate-spin mr-2 h-4 w-4 border-2 border-t-transparent border-current rounded-full" />
                      ..Assigning
                    </>
                  ) : (
                    <PlusCircle className="h-4 w-4" />
                  )}
                  Assign Selected
                  {selectedAvailableRoles.length > 0 && !isAssigningPending && (
                    <span className="ml-1 bg-primary-foreground text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                      {selectedAvailableRoles.length}
                    </span>
                  )}
                </Button>
              </div>
              <div className="flex items-center py-4 justify-between">
                <Input
                  placeholder="Search role here..."
                  value={searchAvailableRole}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchAvailableRole(e.target.value)
                  }
                  className="max-w-sm h-11"
                />
              </div>
              <DataTable
                columns={columns}
                data={filteredAvailableRoles}
                onSelectionChange={setSelectedAvailableRoles}
                //key="available-roles-table"
                key={`available-roles-table-${filteredAvailableRoles.length}-${assignState?.success}`}
              />
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle>Assigned Roles</CardTitle>
              <CardDescription>
                Roles currently assigned to users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Button
                  onClick={unassignRoles}
                  disabled={selectedAssignedRoles.length === 0}
                  variant="outline"
                  className="w-full sm:w-auto transition-all duration-200 flex items-center gap-2"
                >
                  {isUnAssigningPending ? (
                    <>
                      <Icons.spinner className="animate-spin mr-2 h-4 w-4 border-2 border-t-transparent border-current rounded-full" />
                      ..Assigning
                    </>
                  ) : (
                    <MinusCircle className="h-4 w-4" />
                  )}
                  Un-Assign Selected
                  {selectedAssignedRoles.length > 0 &&
                    !isUnAssigningPending && (
                      <span className="ml-1 bg-primary-foreground text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                        {selectedAssignedRoles.length}
                      </span>
                    )}
                </Button>
              </div>
              <div className="flex items-center py-4 justify-between">
                <Input
                  placeholder="Search role here..."
                  value={searchAssignedRole}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchAssignedRole(e.target.value)
                  }
                  className="max-w-sm h-11"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedAssignedRoles([])}
                  className="ml-2"
                >
                  Clear Selection
                </Button>
              </div>
              <DataTable
                columns={columns}
                data={filteredAssignedRoles}
                onSelectionChange={setSelectedAssignedRoles}
                //key="assigned-roles-table"
                key={`assigned-roles-table-${filteredAssignedRoles.length}-${unAssignState?.success}`}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
