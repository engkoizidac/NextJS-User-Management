"use server";

import getUsers, {
  blankUserPassword,
  postUser,
  patchUser,
  getUserById,
  updateUserPassword,
} from "@/_dataAccessLayers/user.dal";
import { removeUser } from "@/_dataAccessLayers/user.dal";
import {
  UserAccountFormSchema,
  UserChangePasswordSchema,
} from "@/_validations/user.validation";
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
    const userCollection = await getAll();
    if (!userCollection) return { errors: { username: "Server error!" } };

    const existingUser = await userCollection.find(
      (user) => user.username === username
    );
    if (existingUser)
      return { errors: { username: "Username already exists!" } };

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
      error: "Failed to delete user!",
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
  try {
    const user = await patchUser(userId, fullName, username, status);
    if (!user) return { errors: { username: "Server error!" } };

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Failed to update user!",
      errors: {
        username: "You are renaming to a username that already exist!",
      },
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
      error: "Failed to reset user password!",
    };
  }
}

export async function changeUserPassword(
  prevState: any,
  formData: FormData,
  userId: string
) {
  const validatedFields = UserChangePasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmedPassword: formData.get("confirmedPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { currentPassword, newPassword } = validatedFields.data;

  try {
    const currentUser = await getById(userId);

    console.log("entered password", currentPassword);
    console.log("current password", currentUser?.password);

    if (!currentUser) {
      return { success: false, message: "User not found" };
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      currentUser.password
    );

    if (!isPasswordValid) {
      return { success: false, message: "Invalid password" };
    }

    const hashedPassword = await bcrypt.hash(<string>newPassword, 10);

    const changeUserPassword = await updateUserPassword(userId, hashedPassword);
    if (!changeUserPassword) return { errors: { username: "Server error!" } };

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Failed to update user password!",
    };
  }
}

export async function getAll() {
  try {
    const users = await getUsers();
    if (!users) throw new Error("Server error!");
    return users;
  } catch (error) {
    throw new Error("Failed to retrieve all user data");
  }
}

export async function getById(id: string) {
  try {
    const users = await getUserById(id);
    if (!users) throw new Error("Server error!");
    return users;
  } catch (error) {
    throw new Error("Failed to retrieve all user data");
  }
}
