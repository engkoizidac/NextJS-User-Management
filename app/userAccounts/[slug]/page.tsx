import { getAssignedRoles, getNotAssignedRoles } from "@/_models/role.model";
import RoleAssignmentSettingsPage from "./role-assignment-settings";
import { getById } from "@/_controllers/user.controller";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const users = await getById((await params).slug);

  const availableRoles = await getNotAssignedRoles((await params).slug);
  const assignedRoles = await getAssignedRoles((await params).slug);

  return (
    <RoleAssignmentSettingsPage
      users={users}
      availableRoles={availableRoles}
      assignedRoles={assignedRoles}
    />
  );
}
