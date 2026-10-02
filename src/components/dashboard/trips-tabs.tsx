"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CheckCircle2, Loader2, Plus, Route as RouteIcon } from "lucide-react";
import type { Booking } from "@/lib/bookings";
import type { Trip } from "@/lib/trips";
import { formatDateTime, formatFcfa } from "@/lib/format";
import {
  bookingStatusFallback,
  bookingStatusStyles,
  tripStatusStyles,
} from "@/lib/trip-status";
import { confirmArrivalAction } from "@/app/actions/bookings";

const roleTabs = ["Voyageur", "Conducteur"] as const;
const statusTabs = [
  { key: "scheduled", label: "À venir" },
  { key: "in_progress", label: "En cours" },
  { key: "completed", label: "Terminés" },
] as const;

export function TripsTabs({
  bookings,
  trips,
  isDriver,
}: {
  bookings: Booking[];
  trips: Trip[];
  isDriver: boolean;
}) {
  const [role, setRole] = useState<(typeof roleTabs)[number]>("Voyageur");
  const [status, setStatus] = useState<(typeof statusTabs)[number]["key"]>(
    "scheduled",
  );

  const filteredBookings = bookings.filter((b) => b.trip.status === status);
  const filteredTrips = trips.filter((t) => t.status === status);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Mes trajets</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tes réservations en tant que voyageur, ou tes trajets publiés en
            tant que conducteur.
          </p>
        </div>
        {role === "Conducteur" && isDriver && (
          <Link
            href="/dashboard/trips/create"
            className="flex items-center justify-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            <Plus className="size-4" />
            Créer un trajet
          </Link>
        )}
      </div>

      <div className="mt-6 flex border border-border">
        {roleTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setRole(tab)}
            className={
              role === tab
                ? "flex-1 border-b-2 border-primary bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary"
                : "flex-1 px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-background"
            }
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4 flex gap-1.5 border border-border p-1">
        {statusTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setStatus(tab.key)}
            className={
              status === tab.key
                ? "flex-1 bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"
                : "flex-1 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-background"
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {role === "Voyageur" ? (
          filteredBookings.length === 0 ? (
            <EmptyState label="Aucune réservation ici pour le moment." />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )
        ) : !isDriver ? (
          <EmptyState label="Deviens conducteur pour publier des trajets." />
        ) : filteredTrips.length === 0 ? (
          <EmptyState label="Aucun trajet publié ici pour le moment." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center border border-dashed border-border py-16 text-center">
      <RouteIcon className="size-8 text-muted-foreground" />
      <p className="mt-3 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function BookingCard({ booking }: { booking: Booking }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const status =
    bookingStatusStyles[booking.statut_validation] ?? bookingStatusFallback;
  const trip = booking.trip;

  const canConfirmArrival =
    booking.statut_validation === "paid" && !booking.funds_released_at;

  const handleConfirmArrival = () => {
    startTransition(async () => {
      const result = await confirmArrivalAction(booking.id);
      if (result.success) {
        toast.success(result.message ?? "Arrivée confirmée !");
        router.refresh();
        return;
      }
      toast.error(result.message ?? "Une erreur est survenue.");
    });
  };

  return (
    <div className="border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="font-semibold text-foreground">
          {trip.departure_city} → {trip.arrival_city}
        </p>
        <span className={`shrink-0 px-2.5 py-1 text-xs font-semibold ${status.className}`}>
          {status.label}
        </span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        {formatDateTime(trip.departure_at)}
      </p>
      <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm">
        <span className="text-muted-foreground">
          {booking.seats_booked} place{booking.seats_booked > 1 ? "s" : ""}
        </span>
        <span className="font-semibold text-primary">
          {formatFcfa(booking.amount_total)}
        </span>
      </div>

      {booking.funds_released_at ? (
        <p className="mt-3 flex items-center gap-1.5 border-t border-border pt-3 text-xs text-emerald-600">
          <CheckCircle2 className="size-3.5" />
          Arrivée confirmée, paiement débloqué
        </p>
      ) : booking.traveler_confirmed_at ? (
        <p className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">
          Arrivée confirmée, en attente du conducteur.
        </p>
      ) : (
        canConfirmArrival && (
          <button
            type="button"
            onClick={handleConfirmArrival}
            disabled={isPending}
            className="mt-3 flex w-full items-center justify-center gap-1.5 border-t border-border pt-3 text-xs font-semibold text-primary disabled:opacity-60"
          >
            {isPending && <Loader2 className="size-3.5 animate-spin" />}
            Confirmer l&apos;arrivée
          </button>
        )
      )}
    </div>
  );
}

function TripCard({ trip }: { trip: Trip }) {
  const status = tripStatusStyles[trip.status];

  return (
    <Link
      href={`/dashboard/trips/${trip.id}`}
      className="block border border-border bg-card p-4 transition-colors hover:border-primary/40"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-semibold text-foreground">
          {trip.departure_city} → {trip.arrival_city}
        </p>
        <span className={`shrink-0 px-2.5 py-1 text-xs font-semibold ${status.className}`}>
          {status.label}
        </span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        {formatDateTime(trip.departure_at)}
      </p>
      <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm">
        <span className="text-muted-foreground">
          {trip.seats_available} place{trip.seats_available > 1 ? "s" : ""} restante
          {trip.seats_available > 1 ? "s" : ""}
        </span>
        <span className="font-semibold text-primary">
          {formatFcfa(trip.price_per_seat)}
        </span>
      </div>
    </Link>
  );
}
