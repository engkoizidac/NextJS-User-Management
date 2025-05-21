"use server";

import getRoles, { patchRole, postRole } from "@/lib/data-access/role";
import { RoleFormSchema } from "@/lib/schema/roleValidation";
import { errors } from "jose";

export async function createRole(prevState: any, formData: FormData) {
  const validatedFields = RoleFormSchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name } = validatedFields.data;

  try {
    const roleCollection = await getRoles();
    if (!roleCollection) return { errors: { name: "Server error!" } };

    const existingRole = await roleCollection.find(
      (role) => role.name === name
    );
    if (existingRole) return { errors: { name: "Role already exists!" } };

    const role = await postRole(name);

    if (!role) return { errors: { name: "Server error!" } };

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Failed to create new role!",
    };
  }
}

export async function updateRole(
  prevState: any,
  formData: FormData,
  roleId: number
) {
  const validatedFields = RoleFormSchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name } = validatedFields.data;

  try {
    const roleCollection = await getRoles();
    if (!roleCollection) return { errors: { name: "Server error!" } };

    const role = await patchRole(roleId, name);
    if (!role) return { errors: { name: "Server error!" } };

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Failed to update role changes!",
      errors: { name: "You are renaming to a role that exist already" },
    };
  }
}
