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
import { unAssignRolesAction } from "@/actions/userRoleController";
import { useRouter } from "next/navigation";

import Icons from "@/components/ui/icons";
import { DataTable } from "@/components/ui/data-table-with-select";
import { columns } from "./access-privileges-columns";
import { assignPrivilegesAction } from "@/actions/accessPrivilegesController";

type Role = {
  id: number;
  name: string;
};

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

export default function AccessPrivilegesSettingsPage({
  role,
  availablePrivileges,
  assignedPrivileges,
}: {
  role: Role | null;
  availablePrivileges: AccessPrivilege[];
  assignedPrivileges: AccessPrivilege[];
}) {
  const router = useRouter();
  const [selectedAvailablePrivileges, setSelectedAvailablePrivileges] =
    useState<AccessPrivilege[]>([]);
  const [selectedAssignedPrivileges, setSelectedAssignedPrivileges] = useState<
    AccessPrivilege[]
  >([]);

  const [searchAvailablePrivileges, setSearchAvailablePrivileges] =
    useState("");
  const [searchAssignedPrivileges, setSearchAssignedRole] = useState("");

  const [assignState, assignPrivilegeActionState, isAssigningPending] =
    useActionState(
      async (
        state: any,
        assignments: { roleId: number; accessPrivilegeId: number }[]
      ) => {
        return await assignPrivilegesAction(assignments);
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

  const assignPrivilege = () => {
    if (!role?.id) {
      throw new Error("User ID is required to assign roles.");
    }
    const selectedAvailableAssignments = selectedAvailablePrivileges.map(
      (AccessPrivilege) => ({
        roleId: role.id,
        accessPrivilegeId: AccessPrivilege.id,
      })
    );
    startTransition(() => {
      assignPrivilegeActionState(selectedAvailableAssignments);
      console.log(selectedAvailableAssignments);
      router.refresh();
    });
  };

  useEffect(() => {
    if (assignState?.success || unAssignState?.success) {
      setSelectedAvailablePrivileges([]);
      //setSelectedAssignedRoles([]);
      setSearchAvailablePrivileges("");
      //setSearchAssignedRole("");
    }
  }, [assignState?.success, unAssignState?.success]);

  const unassignPrivilege = () => {
    if (!role?.id) {
      throw new Error("User ID is required to assign roles.");
    }
    const selectedAssignedAssignments = selectedAssignedPrivileges.map(
      (AccessPrivilege) => ({
        Id: AccessPrivilege.id,
        RoleId: role.id,
      })
    );
    startTransition(() => {
      //unAssignRolesActionState(selectedAssignedAssignments);
      router.refresh();
    });
  };

  // Filter availablePrivileges based on search
  const filteredAvailablePrivileges = availablePrivileges.filter(
    (privilege: AccessPrivilege) =>
      privilege.description
        .toLowerCase()
        .includes(searchAvailablePrivileges.toLowerCase()) ||
      privilege.menu_child.menuMain.name
        .toLowerCase()
        .includes(searchAvailablePrivileges.toLowerCase())
  );

  // Filter assignedPrivileges based on search
  const filteredAssignedPrivileges = assignedPrivileges.filter(
    (privilege: AccessPrivilege) =>
      privilege.description
        .toLowerCase()
        .includes(searchAssignedPrivileges.toLowerCase()) ||
      privilege.menu_child.menuMain.name
        .toLowerCase()
        .includes(searchAssignedPrivileges.toLowerCase())
  );

  return (
    <div className="justify-center items-center ">
      <div className="container mx-auto py-8 ">
        <div className="flex  items-center justify-between">
          <div className="flex font-bold text-2xl">
            Role Management:
            <span className="text-fuchsia-800">&nbsp;{role?.name}</span>
          </div>
          <div className="flex  justify-end">
            <Link href={`/userRoles`} className="flex items-center w-full">
              <button className="text-sm  bg-fuchsia-900 text-white px-4 py-2 rounded hover:bg-fuchsia-950">
                <div className="flex items-center">
                  <ArrowBigLeft className="mr-2 h-5 w-5" />
                  Back to User Roles
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
              <CardTitle>Available Access</CardTitle>
              <CardDescription>
                Access privileges that can be assigned to this current role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Button
                  onClick={assignPrivilege}
                  disabled={
                    selectedAvailablePrivileges.length === 0 ||
                    isAssigningPending
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
                  {selectedAvailablePrivileges.length > 0 &&
                    !isAssigningPending && (
                      <span className="ml-1 bg-primary-foreground text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                        {selectedAvailablePrivileges.length}
                      </span>
                    )}
                </Button>
              </div>
              <div className="flex items-center py-4 justify-between">
                <Input
                  placeholder="Search role here..."
                  value={searchAvailablePrivileges}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchAvailablePrivileges(e.target.value)
                  }
                  className="max-w-sm h-11"
                />
              </div>
              <DataTable
                columns={columns}
                data={filteredAvailablePrivileges}
                onSelectionChange={setSelectedAvailablePrivileges}
                //key="available-roles-table"
                key={`available-roles-table-${filteredAvailablePrivileges.length}-${assignState?.success}`}
              />
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle>Assigned Access</CardTitle>
              <CardDescription>
                Access privileges currently assigned to this role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Button
                  onClick={unassignPrivilege}
                  disabled={selectedAssignedPrivileges.length === 0}
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
                  {selectedAssignedPrivileges.length > 0 &&
                    !isUnAssigningPending && (
                      <span className="ml-1 bg-primary-foreground text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                        {selectedAssignedPrivileges.length}
                      </span>
                    )}
                </Button>
              </div>
              <div className="flex items-center py-4 justify-between">
                <Input
                  placeholder="Search role here..."
                  value={searchAssignedPrivileges}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchAssignedRole(e.target.value)
                  }
                  className="max-w-sm h-11"
                />
              </div>
              <DataTable
                columns={columns}
                data={filteredAssignedPrivileges}
                onSelectionChange={setSelectedAssignedPrivileges}
                //key="assigned-roles-table"
                key={`assigned-roles-table-${filteredAssignedPrivileges.length}-${unAssignState?.success}`}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
