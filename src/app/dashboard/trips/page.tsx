import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { getMyBookings } from "@/lib/bookings";
import { getMyTrips } from "@/lib/trips";
import { TripsTabs } from "@/components/dashboard/trips-tabs";

export default async function TripsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [bookings, trips] = await Promise.all([
    getMyBookings(),
    user.is_driver ? getMyTrips() : Promise.resolve([]),
  ]);

  return (
    <TripsTabs bookings={bookings} trips={trips} isDriver={user.is_driver} />
  );
}
