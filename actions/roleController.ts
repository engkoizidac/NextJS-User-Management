"use server";

import getRoles, { postRole } from "@/lib/data-access/role";
import { RoleFormSchema } from "@/lib/schema/roleValidation";

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
    if (!roleCollection) return { errors: { username: "Server error!" } };

    const existingRole = await roleCollection.find(
      (role) => role.name === name
    );
    if (existingRole) return { errors: { username: "Role already exists." } };

    const user = await postRole(name);

    if (!user) return { errors: { username: "Server error!" } };

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Failed to create new role",
    };
  }
}

export async function updateRole(prevState: any, formData: FormData) {
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
    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Failed to create new role",
    };
  }
}
