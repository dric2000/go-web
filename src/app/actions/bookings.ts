"use server";

import { apiFetch, ApiError } from "@/lib/api";
import { getSessionToken } from "@/lib/session";

export type BookTripState = {
  success?: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
  paymentUrl?: string;
};

export async function bookTripAction(
  tripId: number,
  seatsBooked: number,
): Promise<BookTripState> {
  const token = await getSessionToken();
  if (!token) {
    return { message: "Connecte-toi pour réserver ce trajet." };
  }

  try {
    const body = await apiFetch<{ payment_url: string }>(
      `/trips/${tripId}/book`,
      {
        method: "POST",
        token,
        body: { seats_booked: seatsBooked },
      },
    );
    return { success: true, paymentUrl: body.payment_url };
  } catch (error) {
    if (error instanceof ApiError) {
      return { message: error.message, fieldErrors: error.fieldErrors };
    }
    return { message: "Impossible de réserver ce trajet pour le moment." };
  }
}

export type ConfirmArrivalState = {
  success?: boolean;
  message?: string;
};

export async function confirmArrivalAction(
  bookingId: number,
): Promise<ConfirmArrivalState> {
  const token = await getSessionToken();
  if (!token) {
    return { message: "Session expirée, reconnecte-toi." };
  }

  try {
    const body = await apiFetch<{ message: string }>(
      `/bookings/${bookingId}/confirm-arrival`,
      { method: "POST", token },
    );
    return { success: true, message: body.message };
  } catch (error) {
    if (error instanceof ApiError) {
      return { message: error.message };
    }
    return { message: "Impossible de confirmer l'arrivée pour le moment." };
  }
}
