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
} from "@/_controllers/userRole.controller";
import { useRouter } from "next/navigation";

import Icons from "@/components/ui/icons";
import { columns } from "./role-assignment-columns";
import { DataTable } from "@/components/ui/data-table-with-select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User } from "@/_types/user";
import { Role } from "@/_types/role";

export default function RoleAssignmentSettingsPage({
  users,
  availableRoles,
  assignedRoles,
}: {
  users: User;
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

  const [activeTab, setActiveTab] = useState<string>("available");

  const assignRoles = () => {
    const selectedAvailableAssignments = selectedAvailableRoles.map((role) => ({
      userId: users.id,
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
    const selectedAssignedAssignments = selectedAssignedRoles.map((role) => ({
      userId: users.id,
      roleId: role.id,
    }));
    startTransition(() => {
      unAssignRolesActionState(selectedAssignedAssignments);
      router.refresh();
    });
  };

  // Filter availableRoles based on search
  const filteredAvailableRoles = availableRoles.filter((role: Role) =>
    role.name.toLowerCase().includes(searchAvailableRole.toLowerCase())
  );

  const filteredAssignedRoles = assignedRoles.filter((role: Role) =>
    role.name.toLowerCase().includes(searchAssignedRole.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center w-full px-2 sm:px-4">
      <div className="container mx-auto py-8 px-0 sm:px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex font-bold text-2xl">
            Role Management:
            <span className="text-blue-500">&nbsp;{users.fullName}</span>
          </div>
          <div className="flex justify-end w-full sm:w-auto">
            <Link href={`/userAccounts`} className="flex items-center w-full">
              <button className="text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto">
                <div className="flex items-center justify-center">
                  <ArrowBigLeft className="mr-2 h-5 w-5" />
                  Back to User Accounts
                </div>
              </button>
            </Link>
          </div>
        </div>
        <div className="text-blue-400 mt-2 text-center sm:text-left">
          Assign and manage user roles in your organization
        </div>
      </div>

      <div className="container mx-auto animate-in fade-in duration-500 px-0 sm:px-4">
        {/* Mobile: Tabs */}
        <div className="block md:hidden w-full">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full flex">
              <TabsTrigger value="available" className="flex-1">
                Available Roles
              </TabsTrigger>
              <TabsTrigger value="assigned" className="flex-1">
                Assigned Roles
              </TabsTrigger>
            </TabsList>
            <TabsContent value="available">
              <Card className="shadow-md mt-4">
                <CardHeader className="pb-3">
                  <CardTitle>Available Roles</CardTitle>
                  <CardDescription>
                    Roles that can be assign to this current user
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Button
                      onClick={assignRoles}
                      disabled={
                        selectedAvailableRoles.length === 0 ||
                        isAssigningPending
                      }
                      className="w-full transition-all duration-200 flex items-center gap-2"
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
                      {selectedAvailableRoles.length > 0 &&
                        !isAssigningPending && (
                          <span className="ml-1 bg-primary-foreground text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                            {selectedAvailableRoles.length}
                          </span>
                        )}
                    </Button>
                  </div>
                  <div className="flex flex-col items-center py-4 gap-2">
                    <Input
                      placeholder="Search role here..."
                      value={searchAvailableRole}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearchAvailableRole(e.target.value)
                      }
                      className="w-full max-w-sm h-11"
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <DataTable
                      columns={columns}
                      data={filteredAvailableRoles}
                      onSelectionChange={setSelectedAvailableRoles}
                      key={`available-roles-table-${filteredAvailableRoles.length}-${assignState?.success}`}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="assigned">
              <Card className="shadow-md mt-4">
                <CardHeader className="pb-3">
                  <CardTitle>Assigned Roles</CardTitle>
                  <CardDescription>
                    Roles currently assigned to user
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Button
                      onClick={unassignRoles}
                      disabled={selectedAssignedRoles.length === 0}
                      variant="outline"
                      className="w-full transition-all duration-200 flex items-center gap-2"
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
                  <div className="flex flex-col items-center py-4 gap-2">
                    <Input
                      placeholder="Search role here..."
                      value={searchAssignedRole}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearchAssignedRole(e.target.value)
                      }
                      className="w-full max-w-sm h-11"
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <DataTable
                      columns={columns}
                      data={filteredAssignedRoles}
                      onSelectionChange={setSelectedAssignedRoles}
                      key={`assigned-roles-table-${filteredAssignedRoles.length}-${unAssignState?.success}`}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        {/* Desktop: Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle>Available Roles</CardTitle>
              <CardDescription>
                Roles that can be assign to this current user
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
                Roles currently assigned to user
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
