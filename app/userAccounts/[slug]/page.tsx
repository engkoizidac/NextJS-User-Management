import { getUserById } from "@/_models/user.model";
import { getAssignedRoles, getNotAssignedRoles } from "@/_models/role.model";
import RoleAssignmentSettingsPage from "./role-assignment-settings";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const user = await getUserById((await params).slug);

  const availableRoles = await getNotAssignedRoles((await params).slug);
  const assignedRoles = await getAssignedRoles((await params).slug);

  return (
    <RoleAssignmentSettingsPage
      user={user}
      availableRoles={availableRoles}
      assignedRoles={assignedRoles}
    />
  );
}
