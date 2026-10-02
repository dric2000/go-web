import Link from "next/link";
import { Car, Route as RouteIcon } from "lucide-react";
import { getAvailableTrips } from "@/lib/trips";
import type { Trip } from "@/lib/trips";
import {
  dateKey,
  formatDateHeader,
  formatFcfa,
  formatTime,
} from "@/lib/format";
import { TripSearchForm } from "@/components/site/trip-search-form";
import { PageWatermark } from "@/components/site/page-watermark";

function groupByDay(trips: Trip[]) {
  const groups: { key: string; label: string; trips: Trip[] }[] = [];
  for (const trip of trips) {
    const key = dateKey(trip.departure_at);
    const last = groups[groups.length - 1];
    if (last && last.key === key) {
      last.trips.push(trip);
    } else {
      groups.push({
        key,
        label: formatDateHeader(trip.departure_at),
        trips: [trip],
      });
    }
  }
  return groups;
}

export default async function TrajetsPage({
  searchParams,
}: PageProps<"/trajets">) {
  const params = await searchParams;
  const from = typeof params.from === "string" ? params.from : undefined;
  const to = typeof params.to === "string" ? params.to : undefined;
  const date = typeof params.date === "string" ? params.date : undefined;

  const trips = await getAvailableTrips({ from, to, date });
  const hasFilters = Boolean(from || to || date);
  const groups = groupByDay(trips);

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <PageWatermark />

      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Trouve ton prochain trajet
        </h1>
        <p className="mt-2 text-muted-foreground">
          Parcours les trajets proposés par nos conducteurs à travers le
          Bénin.
        </p>
      </div>

      <div className="mt-8">
        <TripSearchForm initialFilters={{ from, to, date }} />
      </div>

      <div className="mt-8">
        <p className="text-sm text-muted-foreground">
          {trips.length} trajet{trips.length > 1 ? "s" : ""} disponible
          {trips.length > 1 ? "s" : ""}
          {hasFilters ? " pour cette recherche" : ""}
        </p>

        {trips.length === 0 ? (
          <div className="mt-6 flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border py-20 text-center">
            <RouteIcon className="size-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Aucun trajet ne correspond à ta recherche pour le moment.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-8">
            {groups.map((group) => (
              <div key={group.key}>
                <p className="text-xs font-semibold tracking-widest text-muted-foreground">
                  {group.label}
                </p>
                <div className="mt-3 space-y-3">
                  {group.trips.map((trip) => (
                    <TripRow key={trip.id} trip={trip} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function TripRow({ trip }: { trip: Trip }) {
  return (
    <Link
      href={`/trajets/${trip.id}`}
      className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:gap-6 sm:p-5"
    >
      <div className="flex items-center gap-4 sm:flex-1">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Car className="size-5" />
        </span>

        <div className="min-w-0">
          <p className="truncate text-lg font-bold text-foreground">
            {trip.departure_city}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatTime(trip.departure_at)}
          </p>
        </div>
      </div>

      <div className="relative hidden flex-1 px-2 sm:block">
        <p className="mb-1.5 truncate text-center text-xs text-muted-foreground">
          {trip.pickup_point}
        </p>
        <div className="relative flex items-center">
          <span className="h-px flex-1 border-t border-dashed border-border" />
          <span className="mx-2 flex size-6 shrink-0 items-center justify-center rounded-full bg-background text-muted-foreground ring-4 ring-card">
            <RouteIcon className="size-3.5" />
          </span>
          <span className="h-px flex-1 border-t border-dashed border-border" />
        </div>
        <p className="mt-1.5 text-center text-xs text-muted-foreground">
          Trajet direct
        </p>
      </div>

      <div className="sm:flex-1 sm:text-right">
        <p className="text-lg font-bold text-foreground">
          {trip.arrival_city}
        </p>
        <p className="text-sm text-muted-foreground">
          {trip.seats_available} place{trip.seats_available > 1 ? "s" : ""}{" "}
          dispo{trip.seats_available > 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-border pt-4 sm:flex-col sm:items-end sm:justify-center sm:border-t-0 sm:pt-0">
        <span className="text-lg font-bold text-primary">
          {formatFcfa(trip.price_per_seat)}
        </span>
        <span className="shrink-0 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
          Réserver
        </span>
      </div>
    </Link>
  );
}
