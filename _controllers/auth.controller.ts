"use server";

import bcrypt from "bcrypt";

import { LoginFormSchema, RegisterFormSchema } from "@/_validations/user.validation";
import { redirect } from "next/navigation";
import { createSession } from "@/app/auth/session";

import { cookies } from "next/headers";
import getUsers, { postUser } from "@/_dataAccessLayers/user.dal";
import { User } from "@/_types/user";

export async function login(prevState: any, formData: FormData) {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Extract form fields
  const { username, password } = validatedFields.data;

  //Check if username exists in our DB
  const userCollection = await getUsers();
  if (!userCollection) return { errors: { username: "Server error!" } };

  const existingUser = userCollection.find(
    (user: User) => user.username === username
  );

  if (!existingUser) return { errors: { username: "Username doesn't exist." } };

  // Check if user is deactivated
  if (existingUser.status === "Deactivated") {
    return {
      errors: {
        username: "Account is deactivated. Please contact your administrator.",
      },
    };
  }

  //Check password
  const matchedPassword = await bcrypt.compare(
    <string>password,
    existingUser.password
  );
  if (!matchedPassword) return { errors: { password: "Invalid password." } };

  // Create a session
  await createSession(existingUser.id);

  //console.log(existingUser);

  // Redirect
  redirect("/");
}

export async function register(prevState: any, formData: FormData) {
  // Validate form fields
  const validatedFields = RegisterFormSchema.safeParse({
    fullName: formData.get("fullName"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Extract form fields
  const { fullName, username, password } = validatedFields.data;

  // Check if username already exists in our DB
  const userCollection = await getUsers();
  if (!userCollection) return { errors: { username: "Server error!" } };

  const existingUser = userCollection.find(
    (user: User) => user.username === username
  );

  if (existingUser) {
    return { errors: { username: "Username is already taken." } };
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user in the database
  try {
    await postUser(fullName, username, hashedPassword, "Activated");
  } catch (error) {
    return { errors: { username: "Failed to create account. Please try again." } };
  }

  // Redirect to login page after successful registration
  redirect("/login");
}

export async function logout() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/login");
}

