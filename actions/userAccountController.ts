"use server";

import getUsers, {
  blankUserPassword,
  postUser,
  saveChangesOnUser,
} from "@/lib/data-access/user";
import { removeUser } from "@/lib/data-access/user";
import { UserAccountFormSchema } from "@/lib/schema/userValidation";
import bcrypt from "bcrypt";

export async function addUser(prevState: any, formData: FormData) {
  const validatedFields = UserAccountFormSchema.safeParse({
    fullName: formData.get("fullName"),
    username: formData.get("username"),
    password: formData.get("password"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { fullName, username, password, status } = validatedFields.data;

  try {
    const userCollection = await getUsers();
    if (!userCollection) return { errors: { username: "Server error!" } };

    const existingUser = await userCollection.find(
      (user) => user.username === username
    );
    if (existingUser)
      return { errors: { username: "Username already exists." } };

    const hashedPassword = await bcrypt.hash(<string>password, 10);

    const user = await postUser(
      fullName,
      username,
      hashedPassword,
      status === "Activated" ? "Activated" : "Deactivated"
    );

    if (!user) return { errors: { username: "Server error!" } };

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Failed to create user",
    };
  }
}

export async function deleteUser(userId: string) {
  try {
    const user = await removeUser(userId);
    if (!user) return { errors: { username: "Server error!" } };

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Failed to delete user",
    };
  }
}

export async function updateUser(
  revState: any,
  formData: FormData,
  userId: string
) {
  const validatedFields = UserAccountFormSchema.safeParse({
    fullName: formData.get("fullName"),
    username: formData.get("username"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { fullName, username, status } = validatedFields.data;

  const user = await saveChangesOnUser(userId, fullName, username, status);
  if (!user) return { errors: { username: "Server error!" } };

  try {
    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Failed to update user",
    };
  }
}

export async function clearUserPassword(userId: string) {
  const hashedPassword = await bcrypt.hash(<string>"", 10);

  try {
    const user = await blankUserPassword(userId, hashedPassword);
    if (!user) return { errors: { username: "Server error!" } };

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Failed to reset user password",
    };
  }
}
