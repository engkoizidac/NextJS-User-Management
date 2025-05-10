"use server";

import { UserAccountFormSchema } from "@/lib/validation";

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

  console.log(validatedFields.data);

  try {
    // TODO: Add your database logic here
    // For example: await db.user.create({ data: validatedFields.data })

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Failed to create user",
    };
  }
}
