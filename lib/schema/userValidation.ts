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

export const UserChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(0, { message: "Current password is required." })
      .trim(),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be no more than 20 characters")
      .refine((p) => /[a-z]/.test(p), "Must include a lowercase letter")
      .refine((p) => /[A-Z]/.test(p), "Must include an uppercase letter")
      .refine((p) => /\d/.test(p), "Must include a digit")
      .refine((p) => /[\W_]/.test(p), "Must include a special character"),
    confirmedPassword: z
      .string()
      .min(1, { message: "Comfirmation of new password is required." })
      .trim(),
  })
  .refine((data) => data.newPassword === data.confirmedPassword, {
    message: "Passwords do not match! ",
    path: ["confirmedPassword"],
  });
