"use server";

import bcrypt from "bcrypt";

import { LoginFormSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import { createSession } from "@/app/lib/session";

import { cookies } from "next/headers";
import getUsers from "@/lib/data-access/user";

export async function login(state: any, formData: FormData) {
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

  //Check password
  const matchedPassword = await bcrypt.compare(
    <string>password,
    existingUser.password
  );
  if (!matchedPassword) return { errors: { username: "Invalid password." } };

  // Create a session
  await createSession(existingUser.id);

  //console.log(existingUser);

  // Redirect
  redirect("/dashboard");
}

export async function logout() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/");
}
