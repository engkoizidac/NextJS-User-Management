"use server";
import assignRoles, { unAssignRoles } from "@/lib/data-access/user-role";

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

// export async function postAssignedRoles(
//   assignments: { roleId: number; userId: string }[]
// ) {
//   try {
//     const assignedRoles = await assignRoles(assignments);
//     if (!assignedRoles.success) {
//       return {
//         error: "Failed to assign selected roles!",
//       };
//     }

//     return {
//       success: true,
//     };
//   } catch (error) {
//     return {
//       error: "Failed to assign selected roles!",
//     };
//   }
// }
