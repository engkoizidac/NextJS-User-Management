import { z } from "zod";

export const LoginFormSchema = z.object({
  username: z.string().min(1, { message: "Username is required." }).trim(),
  password: z.string().trim().optional(),
});

export const UserAccountFormSchema = z.object({
  fullName: z.string().min(1, { message: "Full Name is required." }).trim(),
  username: z.string().min(1, { message: "Username is required." }).trim(),
  password: z.string().trim().optional(),
  status: z.enum(["Activated", "Deactivated"]),
});
