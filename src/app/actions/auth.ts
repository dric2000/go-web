"use server";

import { redirect } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api";
import { clearSessionToken, setSessionToken } from "@/lib/session";
import {
  loginSchema,
  registerSchema,
  type LoginValues,
  type RegisterValues,
} from "@/lib/schemas/auth";

export type AuthActionState = {
  success?: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

type AuthResponse = {
  user: { id: number; name: string; email: string; phone: string };
  token: string;
};

export async function loginAction(
  values: LoginValues,
): Promise<AuthActionState> {
  // Le client valide déjà avec zod, mais une Server Action est un endpoint
  // public : on revalide ici, on ne fait jamais confiance à l'appelant.
  const parsed = loginSchema.safeParse(values);
  if (!parsed.success) {
    return { message: "Champs invalides." };
  }

  try {
    const data = await apiFetch<AuthResponse>("/login", {
      method: "POST",
      body: { email: parsed.data.email, password: parsed.data.password },
    });
    await setSessionToken(data.token, parsed.data.remember ?? false);
  } catch (error) {
    if (error instanceof ApiError) {
      return { message: error.message, fieldErrors: error.fieldErrors };
    }
    return { message: "Impossible de se connecter pour le moment." };
  }

  // Pas de redirect() ici : on renvoie le succès au client, qui affiche le
  // toast puis navigue lui-même — un redirect() côté serveur couperait la
  // réponse avant que le client ait pu déclencher la notification.
  return { success: true };
}

export async function registerAction(
  values: RegisterValues,
): Promise<AuthActionState> {
  const parsed = registerSchema.safeParse(values);
  if (!parsed.success) {
    return { message: "Champs invalides." };
  }

  try {
    const data = await apiFetch<AuthResponse>("/register", {
      method: "POST",
      body: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        password: parsed.data.password,
        password_confirmation: parsed.data.password_confirmation,
      },
    });
    await setSessionToken(data.token);
  } catch (error) {
    if (error instanceof ApiError) {
      return { message: error.message, fieldErrors: error.fieldErrors };
    }
    return { message: "Impossible de créer le compte pour le moment." };
  }

  return { success: true };
}

export async function logoutAction() {
  await clearSessionToken();
  redirect("/");
}
