"use server";

import { apiFetch, ApiError } from "@/lib/api";
import { getSessionToken } from "@/lib/session";
import { createTripSchema, type CreateTripValues } from "@/lib/schemas/trip";

export type CreateTripState = {
  success?: boolean;
  tripId?: number;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function createTripAction(
  values: CreateTripValues,
): Promise<CreateTripState> {
  const parsed = createTripSchema.safeParse(values);
  if (!parsed.success) {
    return { message: "Champs invalides." };
  }

  const token = await getSessionToken();
  if (!token) {
    return { message: "Session expirée, reconnecte-toi." };
  }

  try {
    const data = await apiFetch<{ trajet: { id: number } }>("/create-trip", {
      method: "POST",
      token,
      body: {
        vehicle_id: parsed.data.vehicleId,
        departure_city: parsed.data.departureCity,
        arrival_city: parsed.data.arrivalCity,
        pickup_point: parsed.data.pickupPoint,
        departure_at: new Date(parsed.data.departureAt).toISOString(),
        seats_total: parsed.data.seatsTotal,
        seats_available: parsed.data.seatsTotal,
        price_per_seat: parsed.data.pricePerSeat,
      },
    });

    return { success: true, tripId: data.trajet.id };
  } catch (error) {
    if (error instanceof ApiError) {
      return { message: error.message, fieldErrors: error.fieldErrors };
    }
    return { message: "Impossible de créer le trajet pour le moment." };
  }
}

export type TripActionState = {
  success?: boolean;
  message?: string;
};

async function tripLifecycleAction(
  tripId: number,
  path: string,
  fallbackError: string,
): Promise<TripActionState> {
  const token = await getSessionToken();
  if (!token) {
    return { message: "Session expirée, reconnecte-toi." };
  }

  try {
    const data = await apiFetch<{ message: string }>(
      `/trips/${tripId}/${path}`,
      { method: "POST", token },
    );
    return { success: true, message: data.message };
  } catch (error) {
    if (error instanceof ApiError) {
      return { message: error.message };
    }
    return { message: fallbackError };
  }
}

export async function startTripAction(tripId: number) {
  return tripLifecycleAction(
    tripId,
    "start",
    "Impossible de démarrer ce trajet pour le moment.",
  );
}

export async function completeTripAction(tripId: number) {
  return tripLifecycleAction(
    tripId,
    "complete",
    "Impossible de terminer ce trajet pour le moment.",
  );
}

export async function cancelTripAction(tripId: number) {
  return tripLifecycleAction(
    tripId,
    "cancel",
    "Impossible d'annuler ce trajet pour le moment.",
  );
}
