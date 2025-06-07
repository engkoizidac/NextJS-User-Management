import { prisma } from "../lib/prisma";

export default async function getNotAssignedAccess(roleId: number) {
  try {
    const assignPrivileges = await prisma.role_access_privilege.findMany({
      select: { accessPrivilegeId: true },
      where: {
        roleId: roleId,
      },
    });

    const excludedIds = assignPrivileges.map((item) => item.accessPrivilegeId);

    return await prisma.access_privilege.findMany({
      where: {
        id: {
          notIn: excludedIds,
        },
      },
      include: {
        menu_child: {
          include: {
            menuMain: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error retreiving role data!", error);
    throw new Error("Failed to retreiving role!");
  }
}

export async function getAssignedAccess(roleId: number) {
  try {
    const assignPrivileges = await prisma.role_access_privilege.findMany({
      select: { accessPrivilegeId: true },
      where: {
        roleId: roleId,
      },
    });

    const excludedIds = assignPrivileges.map((item) => item.accessPrivilegeId);

    return await prisma.access_privilege.findMany({
      where: {
        id: {
          in: excludedIds,
        },
      },
      include: {
        menu_child: {
          include: {
            menuMain: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error retreiving role data!", error);
    throw new Error("Failed to retreiving role!");
  }
}
