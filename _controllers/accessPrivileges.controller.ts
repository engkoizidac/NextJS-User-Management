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
