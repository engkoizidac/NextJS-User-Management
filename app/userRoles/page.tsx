import getRoles from "@/lib/data-access/role";
import UserRoles from "./user-roles";

export default async function UserRolesPage() {
  const Roles = await getRoles();
  return (
    <div>
      <div className="container mx-auto py-8 px-2 sm:px-4">
        <div className="font-bold text-2xl text-center sm:text-left">
          User Roles
        </div>
        <div className="text-blue-400 text-center sm:text-left mt-1">
          Add, edit, and delete user roles and manage their permissions.
        </div>
      </div>
      <UserRoles Roles={Roles} />
    </div>
  );
}
