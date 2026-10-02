import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft, User as UserIcon } from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import { getMyTrips } from "@/lib/trips";
import { getTripBookings } from "@/lib/bookings";
import { formatFcfa } from "@/lib/format";
import { bookingStatusFallback, bookingStatusStyles } from "@/lib/trip-status";

export default async function TripBookingsPage({
  params,
}: PageProps<"/dashboard/trips/[id]/bookings">) {
  const { id } = await params;
  const tripId = Number(id);
  if (!Number.isFinite(tripId)) notFound();

  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.is_driver) redirect(`/dashboard/trips/${tripId}`);

  // Vérifie que ce trajet appartient bien au conducteur connecté avant
  // d'appeler l'endpoint (qui refuserait de toute façon en 403 sinon).
  const myTrips = await getMyTrips();
  const trip = myTrips.find((t) => t.id === tripId);
  if (!trip) redirect(`/dashboard/trips/${tripId}`);

  const bookings = await getTripBookings(tripId);

  return (
    <div className="max-w-2xl">
      <Link
        href={`/dashboard/trips/${tripId}`}
        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        Retour au trajet
      </Link>

      <h1 className="mt-3 text-xl font-bold text-foreground">
        Réservations — {trip.departure_city} → {trip.arrival_city}
      </h1>

      {bookings.length === 0 ? (
        <div className="mt-6 flex flex-col items-center justify-center border border-dashed border-border py-16 text-center">
          <UserIcon className="size-8 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            Aucune réservation pour ce trajet pour le moment.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {bookings.map((booking) => {
            const status =
              bookingStatusStyles[booking.statut_validation] ??
              bookingStatusFallback;

            return (
              <div
                key={booking.id}
                className="border border-border bg-card p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center bg-brand/10 text-brand">
                      <UserIcon className="size-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {booking.traveler?.name ?? "Passager"}
                      </p>
                      {booking.traveler?.phone && (
                        <p className="text-xs text-muted-foreground">
                          {booking.traveler.phone}
                        </p>
                      )}
                    </div>
                  </div>
                  <span
                    className={`shrink-0 px-2.5 py-1 text-xs font-semibold ${status.className}`}
                  >
                    {status.label}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm">
                  <span className="text-muted-foreground">
                    {booking.seats_booked} place
                    {booking.seats_booked > 1 ? "s" : ""}
                  </span>
                  <span className="font-semibold text-primary">
                    {formatFcfa(booking.amount_total)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
