import { registerSchema } from "@/app/lib/validations/register";
import { useCallback } from "react";

export function useValidation() {
  return useCallback((data: any) => {
    return registerSchema.safeParse(data);
  }, []);
}