"use server";

import { revalidatePath } from "next/cache";
import { apiFetch, ApiError } from "@/lib/api";
import { getSessionToken } from "@/lib/session";
import {
  updateProfileSchema,
  type UpdateProfileValues,
} from "@/lib/schemas/profile";

export type UpdateProfileState = {
  success?: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

type UserResponse = {
  message: string;
  user: { id: number; name: string; email: string; phone: string };
};

export async function updateProfileAction(
  values: UpdateProfileValues,
): Promise<UpdateProfileState> {
  const parsed = updateProfileSchema.safeParse(values);
  if (!parsed.success) {
    return { message: "Champs invalides." };
  }

  const token = await getSessionToken();
  if (!token) {
    return { message: "Session expirée, reconnecte-toi." };
  }

  try {
    await apiFetch<UserResponse>("/user", {
      method: "PUT",
      token,
      body: parsed.data,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return { message: error.message, fieldErrors: error.fieldErrors };
    }
    return { message: "Impossible de mettre à jour le profil pour le moment." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
