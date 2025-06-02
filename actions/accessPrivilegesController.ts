"use server";

import assignAccessPrivileges, {
  unAssignAccessPrivileges,
} from "@/lib/data-access/role-access-privilege";

export async function assignPrivilegesAction(
  accessPrivileges: { roleId: number; accessPrivilegeId: number }[]
) {
  return await assignAccessPrivileges(accessPrivileges);
}

export async function unAssignPrivilegesAction(
  accessPrivileges: { roleId: number; accessPrivilegeId: number }[]
) {
  return await unAssignAccessPrivileges(accessPrivileges);
}
