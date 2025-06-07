"use server";

import getNotAssignedAccess, {
  getAssignedAccess,
} from "@/_dataAccessLayers/accessPrivilege.dal";
import assignAccessPrivileges, {
  unAssignAccessPrivileges,
} from "@/_dataAccessLayers/roleAccessPrivilege.dal";

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

export async function getAllNotAssignedPrivilege(id: number) {
  try {
    const users = await getNotAssignedAccess(id);
    if (!users) throw new Error("Server error!");
    return users;
  } catch (error) {
    throw new Error("Failed to retrieve all user data");
  }
}

export async function getAllAssignedPrivilege(id: number) {
  try {
    const users = await getAssignedAccess(id);
    if (!users) throw new Error("Server error!");
    return users;
  } catch (error) {
    throw new Error("Failed to retrieve all user data");
  }
}
