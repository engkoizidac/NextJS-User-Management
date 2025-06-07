import RoleAssignmentSettingsPage from "./role-assignment-settings";
import { getById } from "@/_controllers/user.controller";
import {
  getAllAssignedRoles,
  getAllNotAssignedRoles,
} from "@/_controllers/role.controller";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const users = await getById((await params).slug);

  const availableRoles = await getAllNotAssignedRoles((await params).slug);
  const assignedRoles = await getAllAssignedRoles((await params).slug);

  return (
    <RoleAssignmentSettingsPage
      users={users}
      availableRoles={availableRoles}
      assignedRoles={assignedRoles}
    />
  );
}
