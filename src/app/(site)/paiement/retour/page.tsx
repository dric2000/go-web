import Link from "next/link";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import { getBooking } from "@/lib/bookings";
import { formatFcfa } from "@/lib/format";

export default async function PaymentReturnPage({
  searchParams,
}: PageProps<"/paiement/retour">) {
  const params = await searchParams;
  const bookingId = Number(params.booking_id);

  const user = await getCurrentUser();
  const booking =
    user && Number.isFinite(bookingId) ? await getBooking(bookingId) : null;

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      {!booking ? (
        <>
          <Clock className="size-12 text-muted-foreground" />
          <h1 className="mt-5 text-xl font-bold text-foreground">
            Paiement en cours de confirmation
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Ton paiement est en cours de traitement. Retrouve le statut de
            tes réservations dans ton espace.
          </p>
        </>
      ) : booking.statut_validation === "paid" ? (
        <>
          <CheckCircle2 className="size-12 text-emerald-600" />
          <h1 className="mt-5 text-xl font-bold text-foreground">
            Paiement confirmé !
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {booking.trip.departure_city} → {booking.trip.arrival_city} ·{" "}
            {formatFcfa(booking.amount_total)}
          </p>
        </>
      ) : booking.statut_validation === "canceled" ? (
        <>
          <XCircle className="size-12 text-destructive" />
          <h1 className="mt-5 text-xl font-bold text-foreground">
            Paiement refusé ou annulé
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Ta réservation n&apos;a pas été confirmée. Tu peux réessayer
            depuis la page du trajet.
          </p>
        </>
      ) : (
        <>
          <Clock className="size-12 text-amber-500" />
          <h1 className="mt-5 text-xl font-bold text-foreground">
            Paiement en cours de confirmation
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            On attend la confirmation de notre partenaire de paiement, ça ne
            prend généralement que quelques instants.
          </p>
        </>
      )}

      <Link
        href="/dashboard/trips"
        className="mt-8 bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
      >
        Voir mes trajets
      </Link>
    </section>
  );
}
