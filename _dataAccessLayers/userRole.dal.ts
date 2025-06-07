import { prisma } from "../lib/prisma";

export default async function assignRoles(
  assignments: { roleId: number; userId: string }[]
) {
  try {
    await prisma.user_role.createMany({
      data: assignments,
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating role!", error);
    throw new Error("Failed to create new role!");
  }
}

export async function unAssignRoles(
  assignments: { roleId: number; userId: string }[]
) {
  try {
    await Promise.all(
      assignments.map(({ roleId, userId }) =>
        prisma.user_role.deleteMany({
          where: {
            roleId,
            userId,
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
