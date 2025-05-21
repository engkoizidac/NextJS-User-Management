import { prisma } from "@/lib/prisma";

export default async function getRoles() {
  try {
    return prisma.role.findMany({
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
