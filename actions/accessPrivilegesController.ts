"use server";

import assignAccessPrivileges from "@/lib/data-access/role-access-privilege";

export async function assignPrivilegesAction(
  accessPrivileges: { roleId: number; accessPrivilegeId: number }[]
) {
  return await assignAccessPrivileges(accessPrivileges);
}
