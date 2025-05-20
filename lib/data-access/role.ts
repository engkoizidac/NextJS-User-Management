import { prisma } from "@/lib/prisma";

export default async function getRoles() {
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
    console.error("Error creating role:", error);
    throw new Error("Failed to create new role");
  }
}
