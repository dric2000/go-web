import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { MapPin, Users, Eye } from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import { getTrip, getMyTrips } from "@/lib/trips";
import { formatDateTime, formatFcfa } from "@/lib/format";
import { tripStatusStyles } from "@/lib/trip-status";
import { TripLifecycleActions } from "@/components/dashboard/trip-lifecycle-actions";
import { TripLiveMap } from "@/components/dashboard/trip-live-map";
import { TripTimer } from "@/components/dashboard/trip-timer";

export default async function TripDetailPage({
  params,
}: PageProps<"/dashboard/trips/[id]">) {
  const { id } = await params;
  const tripId = Number(id);
  if (!Number.isFinite(tripId)) notFound();

  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const trip = await getTrip(tripId);
  if (!trip) notFound();

  const myTrips = user.is_driver ? await getMyTrips() : [];
  const isOwner = myTrips.some((t) => t.id === trip.id);

  const status = tripStatusStyles[trip.status];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            {trip.departure_city} → {trip.arrival_city}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatDateTime(trip.departure_at)}
          </p>
        </div>
        <span
          className={`shrink-0 self-start px-2.5 py-1 text-xs font-semibold ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      <div className="mt-6 border border-border bg-card p-6">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              Point de rendez-vous
            </p>
            <p className="mt-1 text-sm text-foreground">
              {trip.pickup_point}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-3">
          <Users className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              Places
            </p>
            <p className="mt-1 text-sm text-foreground">
              {trip.seats_available} disponible
              {trip.seats_available > 1 ? "s" : ""} sur {trip.seats_total}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm text-muted-foreground">
            Prix par place
          </span>
          <span className="text-lg font-bold text-primary">
            {formatFcfa(trip.price_per_seat)}
          </span>
        </div>
      </div>

      {trip.status === "in_progress" && trip.started_at && (
        <div className="mt-6 space-y-4">
          <TripTimer startedAt={trip.started_at} />
          <TripLiveMap tripId={trip.id} />
        </div>
      )}

      {isOwner && (
        <>
          <Link
            href={`/dashboard/trips/${trip.id}/bookings`}
            className="mt-6 flex w-full items-center justify-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground sm:w-auto"
          >
            <Eye className="size-4" />
            Voir les réservations
          </Link>

          <TripLifecycleActions tripId={trip.id} status={trip.status} />
        </>
      )}
    </div>
  );
}
