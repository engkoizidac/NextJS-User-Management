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
import { useRouter } from "next/navigation";

import Icons from "@/components/ui/icons";
import { DataTable } from "@/components/ui/data-table-with-select";
import { columns } from "./access-privileges-columns";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Role } from "@/_types/role";
import { AccessPrivilege } from "@/_types/accessPrivileges";
import {
  assignPrivilegesAction,
  unAssignPrivilegesAction,
} from "@/_controllers/accessPrivileges.controller";

export default function AccessPrivilegesSettingsPage({
  role,
  availablePrivileges,
  assignedPrivileges,
}: {
  role: Role;
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
  const [searchAssignedPrivileges, setSearchAssignedPrivileges] = useState("");

  //Assign Access Privileges
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

  const [unAssignState, unAssignPrivilegeActionState, isUnAssigningPending] =
    useActionState(
      async (
        state: any,
        assignments: { roleId: number; accessPrivilegeId: number }[]
      ) => {
        return await unAssignPrivilegesAction(assignments);
      },
      null
    );

  const assignPrivileges = () => {
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
      setSelectedAssignedPrivileges([]);
      setSearchAvailablePrivileges("");
      setSearchAssignedPrivileges("");
    }
  }, [assignState?.success, unAssignState?.success]);

  const unassignPrivileges = () => {
    if (!role?.id) {
      throw new Error("User ID is required to assign roles.");
    }
    const selectedAssignedAssignments = selectedAssignedPrivileges.map(
      (AccessPrivilege) => ({
        roleId: role.id,
        accessPrivilegeId: AccessPrivilege.id,
      })
    );
    startTransition(() => {
      unAssignPrivilegeActionState(selectedAssignedAssignments);
      router.refresh();
    });
  };

  // Filter availablePrivileges based on search
  const filteredAvailablePrivileges = availablePrivileges.filter(
    (privilege: AccessPrivilege) =>
      privilege.description
        .toLowerCase()
        .includes(searchAvailablePrivileges.toLowerCase()) ||
      privilege.menu_child?.menuMain?.name
        ?.toLowerCase()
        .includes(searchAvailablePrivileges.toLowerCase())
  );

  // Filter assignedPrivileges based on search
  const filteredAssignedPrivileges = assignedPrivileges.filter(
    (privilege: AccessPrivilege) =>
      privilege.description
        .toLowerCase()
        .includes(searchAssignedPrivileges.toLowerCase()) ||
      privilege.menu_child?.menuMain?.name
        ?.toLowerCase()
        .includes(searchAssignedPrivileges.toLowerCase())
  );

  // Add state for mobile tab
  const [activeTab, setActiveTab] = useState<string>("available");

  return (
    <div className="flex flex-col items-center w-full px-2 sm:px-4">
      <div className="container mx-auto py-8 px-0 sm:px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex font-bold text-2xl">
            Role Management:
            <span className="text-blue-500">&nbsp;{role?.name}</span>
          </div>
          <div className="flex justify-end w-full sm:w-auto">
            <Link href={`/userRoles`} className="flex items-center w-full">
              <button className="text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto">
                <div className="flex items-center justify-center">
                  <ArrowBigLeft className="mr-2 h-5 w-5" />
                  Back to User Roles
                </div>
              </button>
            </Link>
          </div>
        </div>
        <div className="text-blue-400 mt-2 text-center sm:text-left">
          Assign and manage user roles in your organization
        </div>
      </div>

      {/* Tabs for mobile, grid for md+ */}
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
                Available Access
              </TabsTrigger>
              <TabsTrigger value="assigned" className="flex-1">
                Assigned Access
              </TabsTrigger>
            </TabsList>
            <TabsContent value="available">
              <Card className="shadow-md mt-4">
                <CardHeader className="pb-3">
                  <CardTitle>Available Access</CardTitle>
                  <CardDescription>
                    Access privileges that can be assigned to this current role
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Button
                      onClick={assignPrivileges}
                      disabled={
                        selectedAvailablePrivileges.length === 0 ||
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
                      {selectedAvailablePrivileges.length > 0 &&
                        !isAssigningPending && (
                          <span className="ml-1 bg-primary-foreground text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                            {selectedAvailablePrivileges.length}
                          </span>
                        )}
                    </Button>
                  </div>
                  <div className="flex flex-col items-center py-4 gap-2">
                    <Input
                      placeholder="Search role here..."
                      value={searchAvailablePrivileges}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearchAvailablePrivileges(e.target.value)
                      }
                      className="w-full max-w-sm h-11"
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <DataTable
                      columns={columns}
                      data={filteredAvailablePrivileges}
                      onSelectionChange={setSelectedAvailablePrivileges}
                      key={`available-roles-table-${filteredAvailablePrivileges.length}-${assignState?.success}`}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="assigned">
              <Card className="shadow-md mt-4">
                <CardHeader className="pb-3">
                  <CardTitle>Assigned Access</CardTitle>
                  <CardDescription>
                    Access privileges currently assigned to this role
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Button
                      onClick={unassignPrivileges}
                      disabled={selectedAssignedPrivileges.length === 0}
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
                      {selectedAssignedPrivileges.length > 0 &&
                        !isUnAssigningPending && (
                          <span className="ml-1 bg-primary-foreground text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                            {selectedAssignedPrivileges.length}
                          </span>
                        )}
                    </Button>
                  </div>
                  <div className="flex flex-col items-center py-4 gap-2">
                    <Input
                      placeholder="Search role here..."
                      value={searchAssignedPrivileges}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearchAssignedPrivileges(e.target.value)
                      }
                      className="w-full max-w-sm h-11"
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <DataTable
                      columns={columns}
                      data={filteredAssignedPrivileges}
                      onSelectionChange={setSelectedAssignedPrivileges}
                      key={`assigned-roles-table-${filteredAssignedPrivileges.length}-${unAssignState?.success}`}
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
              <CardTitle>Available Access</CardTitle>
              <CardDescription>
                Access privileges that can be assigned to this current role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Button
                  onClick={assignPrivileges}
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
              <div className="flex flex-col sm:flex-row items-center py-4 justify-between gap-2">
                <Input
                  placeholder="Search role here..."
                  value={searchAvailablePrivileges}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchAvailablePrivileges(e.target.value)
                  }
                  className="w-full max-w-sm h-11"
                />
              </div>
              <div className="overflow-x-auto">
                <DataTable
                  columns={columns}
                  data={filteredAvailablePrivileges}
                  onSelectionChange={setSelectedAvailablePrivileges}
                  key={`available-roles-table-${filteredAvailablePrivileges.length}-${assignState?.success}`}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md mt-6 md:mt-0">
            <CardHeader className="pb-3">
              <CardTitle>Assigned Access</CardTitle>
              <CardDescription>
                Access privileges currently assigned to this role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Button
                  onClick={unassignPrivileges}
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
              <div className="flex flex-col sm:flex-row items-center py-4 justify-between gap-2">
                <Input
                  placeholder="Search role here..."
                  value={searchAssignedPrivileges}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchAssignedPrivileges(e.target.value)
                  }
                  className="w-full max-w-sm h-11"
                />
              </div>
              <div className="overflow-x-auto">
                <DataTable
                  columns={columns}
                  data={filteredAssignedPrivileges}
                  onSelectionChange={setSelectedAssignedPrivileges}
                  key={`assigned-roles-table-${filteredAssignedPrivileges.length}-${unAssignState?.success}`}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
