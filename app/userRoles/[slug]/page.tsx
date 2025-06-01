import getNotAssignedAccess, {
  getAssignedAccess,
} from "@/lib/data-access/access-privilege";

import { getRoleById } from "@/lib/data-access/role";
import AccessPrivilegesSettingsPage from "./access-privileges-settings";

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
