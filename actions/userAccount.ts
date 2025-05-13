"use server";

import getUsers, { postUser } from "@/lib/user";
import { removeUser } from "@/lib/user";
import { UserAccountFormSchema } from "@/lib/validation";
import bcrypt from "bcrypt";

export async function addUser(prevState: any, formData: FormData) {
  const validatedFields = UserAccountFormSchema.safeParse({
    fullName: formData.get("fullName"),
    username: formData.get("username"),
    password: formData.get("password"),
    status: formData.get("status"),
  });

  console.log(formData.get("status"));

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

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await postUser(
      fullName,
      username,
      hashedPassword,
      status === "Activated" ? "Activated" : "Deactivated"
    );

    if (!user) return { errors: { username: "Server error!" } };
    console.log("New user created:", user);

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
  console.log("Deleted userid:" + userId);
  try {
    const user = await removeUser(userId);
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
