import { prisma } from "../lib/prisma";

export default async function assignAccessPrivileges(
  accessPrivileges: { accessPrivilegeId: number; roleId: number }[]
) {
  try {
    await prisma.role_access_privilege.createMany({
      data: accessPrivileges,
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating role!", error);
    throw new Error("Failed to create new role!");
  }
}

export async function unAssignAccessPrivileges(
  accessPrivileges: { accessPrivilegeId: number; roleId: number }[]
) {
  try {
    await Promise.all(
      accessPrivileges.map(({ accessPrivilegeId, roleId }) =>
        prisma.role_access_privilege.deleteMany({
          where: {
            roleId,
            accessPrivilegeId,
          },
        })
      )
    );
    return { success: true };
  } catch (error) {
    console.error("Error creating role!", error);
    throw new Error("Failed to create new role!");
  }
}
