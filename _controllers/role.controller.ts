"use server";

import getRoles, {
  getAssignedRoles,
  getNotAssignedRoles,
  getRoleById,
  patchRole,
  postRole,
  removeRole,
} from "@/_dataAccessLayers/role.dal";
import { RoleFormSchema } from "@/_validations/role.validation";

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
    const roleCollection = await getAll();
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

export async function deleteRole(roleId: number) {
  try {
    const role = await removeRole(roleId);
    if (!role) return { errors: { rolename: "Server error!" } };

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Failed to delete role!",
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

export async function getAllNotAssignedRoles(id: string) {
  try {
    const users = await getNotAssignedRoles(id);
    if (!users) throw new Error("Server error!");
    return users;
  } catch (error) {
    throw new Error("Failed to retrieve all user data");
  }
}

export async function getAllAssignedRoles(id: string) {
  try {
    const users = await getAssignedRoles(id);
    if (!users) throw new Error("Server error!");
    return users;
  } catch (error) {
    throw new Error("Failed to retrieve all user data");
  }
}

export async function getAll() {
  try {
    const users = await getRoles();
    if (!users) throw new Error("Server error!");
    return users;
  } catch (error) {
    throw new Error("Failed to retrieve all user data");
  }
}

export async function getById(id: number) {
  try {
    const users = await getRoleById(id);
    if (!users) throw new Error("Server error!");
    return users;
  } catch (error) {
    throw new Error("Failed to retrieve all user data");
  }
}
