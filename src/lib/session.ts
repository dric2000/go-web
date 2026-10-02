import "server-only";
import { cookies } from "next/headers";
import { apiFetch, ApiError } from "@/lib/api";

const COOKIE_NAME = "go_token";

export async function setSessionToken(token: string, persistent = true) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // Sans maxAge, le cookie est un cookie de session : il expire à la
    // fermeture du navigateur ("Se souvenir de moi" décoché).
    ...(persistent ? { maxAge: 60 * 60 * 24 * 30 } : {}),
  });
}

export async function getSessionToken() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

export async function clearSessionToken() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export type VerificationStatus = "pending" | "approved" | "rejected" | null;

export type CurrentUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
  is_driver: boolean;
  identity_status: VerificationStatus;
  license_status: VerificationStatus;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const token = await getSessionToken();
  if (!token) return null;

  try {
    return await apiFetch<CurrentUser>("/user", { token });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return null;
    }
    throw error;
  }
}
