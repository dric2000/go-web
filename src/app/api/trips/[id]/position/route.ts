import { NextResponse } from "next/server";

const API_URL = process.env.API_URL ?? "http://localhost:8000/api";

// Simple proxy vers go-api : le composant carte fait du polling côté
// client, et on garde la règle du projet (le navigateur ne parle jamais
// directement à go-api, pour éviter le CORS).
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const response = await fetch(`${API_URL}/trips/${id}/position`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  const data = await response.json().catch(() => ({}));

  // Laravel sérialise les colonnes `decimal` en chaînes ("6.3703000") ;
  // on normalise ici pour que le client reçoive de vrais nombres.
  return NextResponse.json(
    {
      lat: data.lat == null ? null : Number(data.lat),
      lng: data.lng == null ? null : Number(data.lng),
      updated_at: data.updated_at ?? null,
    },
    { status: response.status },
  );
}
