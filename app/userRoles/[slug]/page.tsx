import { getRoleById } from "@/_models/role.model";
import AccessPrivilegesSettingsPage from "./access-privileges-settings";
import getNotAssignedAccess, {
  getAssignedAccess,
} from "@/_models/accessPrivilege.model";

export default async function AccessPrivilegesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const role = await getRoleById(Number((await params).slug));
  const availablePrivileges = await getNotAssignedAccess(
    Number((await params).slug)
  );
  const assignedPrivileges = await getAssignedAccess(
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
