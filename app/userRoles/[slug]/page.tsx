import AccessPrivilegesSettingsPage from "./access-privileges-settings";
import { getById } from "@/_controllers/role.controller";
import {
  getAllAssignedPrivilege,
  getAllNotAssignedPrivilege,
} from "@/_controllers/accessPrivileges.controller";

export default async function AccessPrivilegesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const role = await getById(Number((await params).slug));
  const availablePrivileges = await getAllNotAssignedPrivilege(
    Number((await params).slug)
  );
  const assignedPrivileges = await getAllAssignedPrivilege(
    Number((await params).slug)
  );

  return (
    <AccessPrivilegesSettingsPage
      role={role}
      availablePrivileges={availablePrivileges}
      assignedPrivileges={assignedPrivileges}
    />
  );
}
