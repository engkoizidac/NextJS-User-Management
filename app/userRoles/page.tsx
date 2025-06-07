import UserRoles from "./user-roles";
import FormTitleComponent from "../components/form-title";
import { getAll } from "@/_controllers/role.controller";

export default async function UserRolesPage() {
  const Roles = await getAll();
  return (
    <div>
      <div className="container mx-auto py-8 px-2 sm:px-4">
        <FormTitleComponent
          title="User Roles"
          subTitle="Add, edit, and delete user roles and manage their permissions."
        />
      </div>
      <UserRoles Roles={Roles} />
    </div>
  );
}
