"use server";

import { apiFetch, apiFetchMultipart, ApiError } from "@/lib/api";
import { getSessionToken } from "@/lib/session";
import { licenseSchema, type LicenseValues } from "@/lib/schemas/become-driver";

export type BecomeDriverState = {
  success?: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

async function requireToken(): Promise<string | { message: string }> {
  const token = await getSessionToken();
  if (!token) return { message: "Session expirée, reconnecte-toi." };
  return token;
}

// Étape 1 : identité (document_type + file), en multipart.
export async function submitIdentityAction(
  formData: FormData,
): Promise<BecomeDriverState> {
  const token = await requireToken();
  if (typeof token !== "string") return token;

  try {
    await apiFetchMultipart("/verify-identity", { formData, token });
  } catch (error) {
    if (error instanceof ApiError) {
      return { message: error.message, fieldErrors: error.fieldErrors };
    }
    return { message: "Impossible d'envoyer le document pour le moment." };
  }

  return { success: true };
}

// Étape 2 : numéro de permis, en JSON classique.
export async function submitLicenseAction(
  values: LicenseValues,
): Promise<BecomeDriverState> {
  const parsed = licenseSchema.safeParse(values);
  if (!parsed.success) {
    return { message: "Champs invalides." };
  }

  const token = await requireToken();
  if (typeof token !== "string") return token;

  try {
    await apiFetch("/become-driver", {
      method: "POST",
      token,
      body: { license_number: parsed.data.licenseNumber },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return { message: error.message, fieldErrors: error.fieldErrors };
    }
    return { message: "Impossible de créer le profil conducteur pour le moment." };
  }

  return { success: true };
}

// Étape 3 : véhicule (marque, modele, plaque_number, photo), en multipart.
export async function submitVehicleAction(
  formData: FormData,
): Promise<BecomeDriverState> {
  const token = await requireToken();
  if (typeof token !== "string") return token;

  try {
    await apiFetchMultipart("/add-vehicle", { formData, token });
  } catch (error) {
    if (error instanceof ApiError) {
      return { message: error.message, fieldErrors: error.fieldErrors };
    }
    return { message: "Impossible d'ajouter le véhicule pour le moment." };
  }

  return { success: true };
}
