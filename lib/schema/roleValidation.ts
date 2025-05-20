import { z } from "zod";

export const RoleFormSchema = z.object({
  name: z.string().min(1, { message: "Role name is required." }).trim(),
});
