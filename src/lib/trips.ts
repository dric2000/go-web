import "server-only";
import { apiFetch, ApiError } from "@/lib/api";
import { getSessionToken } from "@/lib/session";

export type TripStatus = "scheduled" | "in_progress" | "completed" | "canceled";

export type Trip = {
  id: number;
  vehicle_id: number;
  departure_city: string;
  arrival_city: string;
  pickup_point: string;
  departure_at: string;
  seats_total: number;
  seats_available: number;
  price_per_seat: number;
  status: TripStatus;
  started_at: string | null;
  driver_name: string | null;
  vehicle: { marque: string; modele: string } | null;
};

export type TripSearchFilters = {
  from?: string;
  to?: string;
  date?: string;
};

// Trajets ouverts à la réservation, visible sans compte (page publique
// "Trajets" du site vitrine).
export async function getAvailableTrips(
  filters: TripSearchFilters = {},
): Promise<Trip[]> {
  const params = new URLSearchParams();
  if (filters.from) params.set("from", filters.from);
  if (filters.to) params.set("to", filters.to);
  if (filters.date) params.set("date", filters.date);

  const qs = params.toString();
  const body = await apiFetch<{ data: Trip[] }>(`/trips${qs ? `?${qs}` : ""}`);
  return body.data;
}

// Détail d'un trajet, visible sans compte (page publique "Trajets").
export async function getPublicTrip(id: number): Promise<Trip | null> {
  try {
    const body = await apiFetch<{ data: Trip }>(`/trips/${id}`);
    return body.data;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Trajets créés par l'utilisateur en tant que conducteur.
export async function getMyTrips(): Promise<Trip[]> {
  const token = await getSessionToken();
  if (!token) return [];

  const body = await apiFetch<{ data: Trip[] }>("/my-trips", { token });
  return body.data;
}

export async function getTrip(id: number): Promise<Trip | null> {
  const token = await getSessionToken();
  if (!token) return null;

  const body = await apiFetch<{ data: Trip }>(`/trips/${id}`, { token });
  return body.data;
}
