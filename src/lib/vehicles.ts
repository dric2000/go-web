import "server-only";
import { apiFetch } from "@/lib/api";
import { getSessionToken } from "@/lib/session";

export type Vehicle = {
  id: number;
  marque: string;
  modele: string;
  plaque_number: string;
  photo_url: string | null;
  status_verification: "pending" | "approved" | "rejected";
};

export async function getMyVehicles(): Promise<Vehicle[]> {
  const token = await getSessionToken();
  if (!token) return [];

  const body = await apiFetch<{ data: Vehicle[] }>("/my-vehicles", { token });
  return body.data;
}
