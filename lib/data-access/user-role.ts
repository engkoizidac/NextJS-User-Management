import { prisma } from "../prisma";

export default async function assignRoles(
  assignments: { roleId: number; userId: string }[]
) {
  console.log("Creating new role assignments:", assignments);
  try {
    await prisma.user_role.createMany({
      data: assignments,
      skipDuplicates: true, // Prevent unique constraint errors
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating role!", error);
    throw new Error("Failed to create new role!");
  }
}
