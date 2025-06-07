import { prisma } from "@/lib/prisma";

export default async function getRoles() {
  try {
    return await prisma.role.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  } catch (error) {
    console.error("Error retreiving role data!", error);
    throw new Error("Failed to retreiving role!");
  }
}

export async function getRoleById(roleId: number) {
  try {
    return await prisma.role.findUnique({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        id: roleId,
      },
    });
  } catch (error) {
    console.error("Error retreiving role data!", error);
    throw new Error("Failed to retreiving role!");
  }
}

export async function getNotAssignedRoles(userId: string) {
  try {
    const assignRoles = await prisma.user_role.findMany({
      select: { roleId: true },
      where: {
        userId: userId,
      },
    });

    const excludedIds = assignRoles.map((item) => item.roleId);

    return await prisma.role.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        id: {
          notIn: excludedIds,
        },
      },
    });
  } catch (error) {
    console.error("Error retreiving role data!", error);
    throw new Error("Failed to retreiving role!");
  }
}

export async function getAssignedRoles(userId: string) {
  try {
    const assignRoles = await prisma.user_role.findMany({
      select: { roleId: true },
      where: {
        userId: userId,
      },
    });

    const includeIds = assignRoles.map((item) => item.roleId);

    return prisma.role.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        id: {
          in: includeIds,
        },
      },
    });
  } catch (error) {
    console.error("Error retreiving role data!", error);
    throw new Error("Failed to retreiving role!");
  }
}

export async function postRole(name: string) {
  try {
    await prisma.role.create({
      data: {
        name: name,
        updatedAt: new Date().toISOString(),
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating role!", error);
    throw new Error("Failed to create new role!");
  }
}

export async function removeRole(roleId: number) {
  try {
    await prisma.role.delete({
      where: {
        id: roleId,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting role:", error);
    throw new Error("Failed to delete role. Please try again!");
  }
}

export async function patchRole(userId: number, name: string) {
  try {
    await prisma.role.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
        updatedAt: new Date().toISOString(),
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error to update changes on role!:", error);
    throw new Error("Failed to update changes on role! Please try again.");
  }
}
