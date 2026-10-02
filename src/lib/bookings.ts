import "server-only";
import { apiFetch, ApiError } from "@/lib/api";
import { getSessionToken } from "@/lib/session";
import type { Trip } from "@/lib/trips";

export type Booking = {
  id: number;
  trip_id: number;
  seats_booked: number;
  statut_validation: "pending_payment" | "paid" | "canceled" | string;
  amount_total: number;
  paid_at: string | null;
  driver_arrival_confirmed_at: string | null;
  traveler_confirmed_at: string | null;
  funds_released_at: string | null;
  trip: Trip;
  // Présent uniquement quand consulté par le conducteur du trajet
  // (endpoint /trips/{trip}/bookings).
  traveler?: { name: string; phone: string };
};

// Réservations de l'utilisateur en tant que voyageur.
export async function getMyBookings(): Promise<Booking[]> {
  const token = await getSessionToken();
  if (!token) return [];

  const body = await apiFetch<{ data: Booking[] }>("/bookings", { token });
  return body.data;
}

// Une réservation précise, vue voyageur (propriétaire uniquement). Utilisé
// par la page de retour de paiement pour afficher le vrai statut.
export async function getBooking(id: number): Promise<Booking | null> {
  const token = await getSessionToken();
  if (!token) return null;

  try {
    const body = await apiFetch<{ data: Booking }>(`/bookings/${id}`, {
      token,
    });
    return body.data;
  } catch (error) {
    if (
      error instanceof ApiError &&
      (error.status === 403 || error.status === 404)
    ) {
      return null;
    }
    throw error;
  }
}

// Réservations d'un trajet donné, vue conducteur (propriétaire uniquement).
export async function getTripBookings(tripId: number): Promise<Booking[]> {
  const token = await getSessionToken();
  if (!token) return [];

  const body = await apiFetch<{ data: Booking[] }>(
    `/trips/${tripId}/bookings`,
    { token },
  );
  return body.data;
}
