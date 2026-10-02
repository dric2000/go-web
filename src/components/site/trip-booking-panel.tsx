"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Loader2, Lock, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bookTripAction } from "@/app/actions/bookings";
import { formatFcfa } from "@/lib/format";
import type { Trip } from "@/lib/trips";

export function TripBookingPanel({
  trip,
  isAuthenticated,
}: {
  trip: Trip;
  isAuthenticated: boolean;
}) {
  const [seats, setSeats] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const unavailable = trip.status !== "scheduled" || trip.seats_available <= 0;

  if (unavailable) {
    return (
      <p className="text-sm text-muted-foreground">
        Ce trajet n&apos;accepte plus de réservations pour le moment.
      </p>
    );
  }

  if (!isAuthenticated) {
    const redirect = `/trajets/${trip.id}`;
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Connecte-toi pour réserver ce trajet.
        </p>
        <Link
          href={`/login?redirect=${redirect}`}
          className="flex h-12 w-full items-center justify-center rounded-full bg-primary px-5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Se connecter pour réserver
        </Link>
        <p className="text-center text-sm text-muted-foreground">
          Pas encore de compte ?{" "}
          <Link
            href={`/register?redirect=${redirect}`}
            className="font-medium text-primary"
          >
            S&apos;inscrire
          </Link>
        </p>
      </div>
    );
  }

  const onSubmit = () => {
    setError(null);
    startTransition(async () => {
      const result = await bookTripAction(trip.id, seats);
      if (result.success && result.paymentUrl) {
        toast.success("Réservation créée, redirection vers le paiement…");
        window.location.href = result.paymentUrl;
        return;
      }
      setError(result.message ?? "Une erreur est survenue.");
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          Nombre de places
        </label>
        <div className="mt-2 flex items-center gap-4">
          <button
            type="button"
            onClick={() => setSeats((s) => Math.max(1, s - 1))}
            disabled={seats <= 1}
            aria-label="Retirer une place"
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted disabled:opacity-40"
          >
            <Minus className="size-4" />
          </button>
          <span className="w-10 text-center text-2xl font-bold text-foreground">
            {seats}
          </span>
          <button
            type="button"
            onClick={() =>
              setSeats((s) => Math.min(trip.seats_available, s + 1))
            }
            disabled={seats >= trip.seats_available}
            aria-label="Ajouter une place"
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted disabled:opacity-40"
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2 border-t border-border pt-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {seats} place{seats > 1 ? "s" : ""} × {formatFcfa(trip.price_per_seat)}
          </span>
          <span>{formatFcfa(trip.price_per_seat * seats)}</span>
        </div>
        <div className="flex items-center justify-between pt-2">
          <span className="text-base font-semibold text-foreground">Total</span>
          <span className="text-2xl font-bold text-primary">
            {formatFcfa(trip.price_per_seat * seats)}
          </span>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button
        onClick={onSubmit}
        disabled={isPending}
        className="h-12 w-full rounded-full text-base"
      >
        {isPending && <Loader2 className="animate-spin" />}
        Réserver et payer
      </Button>

      <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Lock className="size-3.5" />
        Paiement sécurisé par Fedapay
      </p>
    </div>
  );
}
