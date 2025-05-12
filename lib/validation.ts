import { z } from "zod";

export const LoginFormSchema = z.object({
  username: z.string().min(1, { message: "Username is required." }).trim(),
  password: z.string().min(1, { message: "Password is required." }).trim(),
});

export const UserAccountFormSchema = z.object({
  fullName: z.string().min(1, { message: "Full Name is required." }).trim(),
  username: z.string().min(1, { message: "Username is required." }).trim(),
  password: z.string().min(1, { message: "Password is required." }).trim(),
  status: z.enum(["Activated", "Deactivated"]),
});
