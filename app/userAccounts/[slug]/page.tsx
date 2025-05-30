import { getUserById } from "@/lib/data-access/user";
import AccessPrivilegesPage from "./role-settings";
import { getAssignedRoles, getNotAssignedRoles } from "@/lib/data-access/role";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const user = await getUserById((await params).slug);
  const availableRoles = await getNotAssignedRoles((await params).slug);
  const assignedRoles = await getAssignedRoles((await params).slug);

  return (
    <AccessPrivilegesPage
      user={user}
      availableRoles={availableRoles}
      assignedRoles={assignedRoles}
    />
  );
}
