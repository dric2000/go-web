import "server-only";
import { apiFetch, ApiError } from "@/lib/api";
import { getSessionToken } from "@/lib/session";

export type Wallet = {
  solde_bloque: number;
  solde_disponible: number;
};

export type WalletEntryKind = "payment" | "refund" | "payout";

export type WalletHistoryEntry = {
  id: number;
  kind: WalletEntryKind;
  amount: number;
  status: string;
  created_at: string;
  trip_label: string | null;
  traveler_name: string | null;
};

// Solde du conducteur connecté. Renvoie null pour un simple voyageur (la
// route API renvoie une 403, cohérent avec le fait qu'un voyageur n'a pas
// de wallet).
export async function getWallet(): Promise<Wallet | null> {
  const token = await getSessionToken();
  if (!token) return null;

  try {
    const body = await apiFetch<{ data: Wallet }>("/wallet", { token });
    return body.data;
  } catch (error) {
    if (error instanceof ApiError && error.status === 403) {
      return null;
    }
    throw error;
  }
}

type RawTransaction = {
  id: number;
  type: "payment" | "refund";
  amount: number;
  status: string;
  created_at: string;
  trip?: { departure_city: string; arrival_city: string } | null;
  traveler?: { name: string } | null;
};

type RawPayout = {
  id: number;
  amount: number;
  status: string;
  created_at: string;
};

// Fusionne transactions + payouts (si conducteur) en un seul historique
// trié du plus récent au plus ancien — même logique que côté mobile.
export async function getWalletHistory(
  includePayouts: boolean,
): Promise<WalletHistoryEntry[]> {
  const token = await getSessionToken();
  if (!token) return [];

  const [transactionsBody, payoutsBody] = await Promise.all([
    apiFetch<{ data: RawTransaction[] }>("/transactions", { token }),
    includePayouts
      ? apiFetch<{ data: RawPayout[] }>("/payouts", { token })
      : Promise.resolve({ data: [] as RawPayout[] }),
  ]);

  const transactionEntries: WalletHistoryEntry[] = transactionsBody.data.map(
    (t) => ({
      id: t.id,
      kind: t.type,
      amount: t.amount,
      status: t.status,
      created_at: t.created_at,
      trip_label: t.trip
        ? `${t.trip.departure_city} → ${t.trip.arrival_city}`
        : null,
      traveler_name: t.traveler?.name ?? null,
    }),
  );

  const payoutEntries: WalletHistoryEntry[] = payoutsBody.data.map((p) => ({
    id: p.id,
    kind: "payout" as const,
    amount: p.amount,
    status: p.status,
    created_at: p.created_at,
    trip_label: null,
    traveler_name: null,
  }));

  return [...transactionEntries, ...payoutEntries].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
}
