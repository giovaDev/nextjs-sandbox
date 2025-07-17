import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  age: z
    .union([z.number().min(18, "Must be at least 18"), z.undefined()])
    .optional(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;