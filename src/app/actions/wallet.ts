"use server";

import { apiFetch, ApiError } from "@/lib/api";
import { getSessionToken } from "@/lib/session";

export type PayoutState = {
  success?: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function requestPayoutAction(
  amount: number,
  phoneNumber: string,
): Promise<PayoutState> {
  const token = await getSessionToken();
  if (!token) {
    return { message: "Session expirée, reconnecte-toi." };
  }

  try {
    const body = await apiFetch<{ message: string }>("/payouts", {
      method: "POST",
      token,
      body: { amount, phone_number: phoneNumber },
    });
    return { success: true, message: body.message };
  } catch (error) {
    if (error instanceof ApiError) {
      return { message: error.message, fieldErrors: error.fieldErrors };
    }
    return { message: "Impossible de demander le retrait pour le moment." };
  }
}
