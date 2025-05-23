import { getUserById } from "@/lib/data-access/user";
import AccessPrivilegesPage from "./access-privileges";
import getRoles, { getAvailableRoleNotAssigned } from "@/lib/data-access/role";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const user = await getUserById((await params).slug);
  const availableRoles = await getAvailableRoleNotAssigned((await params).slug);

  return <AccessPrivilegesPage user={user} availableRoles={availableRoles} />;
}
