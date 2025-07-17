"use server";

import { registerSchema } from "@/app/lib/validations/register";

export async function registerAction(prevState: any, formData: FormData) {
  console.log('DEBUG:: received data:', formData);
  const result = registerSchema.safeParse(formData);
  console.log('DEBUG:: parsed data:', result);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      success: false,
    };
  }

  // Simula salvataggio / invio / DB
  console.log("REGISTERED:", result.data);

  return {
    errors: {},
    success: true,
  };
}
