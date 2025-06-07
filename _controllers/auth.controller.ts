"use server";

import bcrypt from "bcrypt";

import { LoginFormSchema } from "@/_validations/user.validation";
import { redirect } from "next/navigation";
import { createSession } from "@/app/auth/session";

import { cookies } from "next/headers";
import getUsers from "@/_dataAccessLayers/user.dal";

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

  const existingUser = await userCollection.find(
    (user) => user.username === username
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

export async function logout() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/");
}
