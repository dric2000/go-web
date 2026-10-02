import { notFound } from "next/navigation";
import { Car, MapPin, Route as RouteIcon, User as UserIcon } from "lucide-react";
import { getPublicTrip } from "@/lib/trips";
import { getCurrentUser } from "@/lib/session";
import { formatDateHeader, formatFcfa, formatTime } from "@/lib/format";
import { TripBookingPanel } from "@/components/site/trip-booking-panel";
import { PageWatermark } from "@/components/site/page-watermark";

export default async function TrajetDetailPage({
  params,
}: PageProps<"/trajets/[id]">) {
  const { id } = await params;
  const tripId = Number(id);
  if (!Number.isFinite(tripId)) notFound();

  const trip = await getPublicTrip(tripId);
  if (!trip) notFound();

  const user = await getCurrentUser();

  return (
    <section className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16">
      <PageWatermark />

      <div className="text-center">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          {formatDateHeader(trip.departure_at)}
        </p>
        <div className="mt-3 flex items-center justify-center gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Car className="size-6" />
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
            {trip.departure_city}
            <span className="mx-3 text-primary">→</span>
            {trip.arrival_city}
          </h1>
        </div>
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <div className="grid divide-y divide-border lg:grid-cols-2 lg:divide-x lg:divide-y-0">
          <div className="p-6 sm:p-8">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Itinéraire
            </p>

            <div className="mt-5 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">
                  Départ
                </p>
                <p className="mt-1 text-3xl font-bold text-foreground">
                  {formatTime(trip.departure_at)}
                </p>
                <p className="mt-1 text-base text-muted-foreground">
                  {trip.departure_city}
                  {trip.pickup_point ? ` (${trip.pickup_point})` : ""}
                </p>
              </div>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                <MapPin className="size-5" />
              </span>
            </div>

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 border-t border-dashed border-border" />
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-background text-muted-foreground ring-4 ring-card">
                <RouteIcon className="size-4" />
              </span>
              <span className="h-px flex-1 border-t border-dashed border-border" />
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">
                Arrivée
              </p>
              <p className="mt-1 text-3xl font-bold text-foreground">
                {trip.arrival_city}
              </p>
            </div>

            {(trip.driver_name || trip.vehicle) && (
              <div className="mt-8 flex items-center gap-3 border-t border-border pt-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <UserIcon className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">
                    Conducteur
                  </p>
                  {trip.driver_name && (
                    <p className="text-base font-semibold text-foreground">
                      {trip.driver_name}
                    </p>
                  )}
                  {trip.vehicle && (
                    <p className="text-sm text-muted-foreground">
                      {trip.vehicle.marque} {trip.vehicle.modele}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
              <span className="text-sm text-muted-foreground">Places</span>
              <span className="text-sm font-semibold text-foreground">
                {trip.seats_available} disponible
                {trip.seats_available > 1 ? "s" : ""} sur {trip.seats_total}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Prix par place
              </span>
              <span className="text-base font-bold text-primary">
                {formatFcfa(trip.price_per_seat)}
              </span>
            </div>
          </div>

          <div className="bg-background/40 p-6 sm:p-8">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Réservation
            </p>
            <div className="mt-5">
              <TripBookingPanel trip={trip} isAuthenticated={Boolean(user)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
