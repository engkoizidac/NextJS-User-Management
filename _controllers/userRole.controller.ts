"use server";

import assignRoles, { unAssignRoles } from "@/_dataAccessLayers/userRole.dal";

export async function assignRolesAction(
  assignments: { userId: string; roleId: number }[]
) {
  return await assignRoles(assignments);
}

export async function unAssignRolesAction(
  assignments: { userId: string; roleId: number }[]
) {
  return await unAssignRoles(assignments);
}
