import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Car, ShieldCheck } from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import { getMyVehicles } from "@/lib/vehicles";
import { AddVehicleSheet } from "@/components/dashboard/add-vehicle-sheet";

const statusStyles = {
  approved: { label: "Vérifié", className: "bg-emerald-500/10 text-emerald-600" },
  pending: { label: "En attente", className: "bg-amber-500/10 text-amber-600" },
  rejected: { label: "Refusé", className: "bg-destructive/10 text-destructive" },
} as const;

export default async function VehiclesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  if (!user.is_driver) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="flex size-16 items-center justify-center bg-brand/10 text-brand">
          <ShieldCheck className="size-8" />
        </div>
        <h1 className="mt-4 text-xl font-bold text-foreground">
          Deviens conducteur pour ajouter un véhicule
        </h1>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Tes véhicules apparaîtront ici une fois ton profil conducteur
          approuvé.
        </p>
        <Link
          href="/dashboard/become-driver"
          className="mt-5 bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Devenir conducteur
        </Link>
      </div>
    );
  }

  const vehicles = await getMyVehicles();

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Mes voitures</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Les véhicules que tu as soumis pour publier des trajets.
          </p>
        </div>
        <AddVehicleSheet />
      </div>

      {vehicles.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center border border-dashed border-border py-16 text-center">
          <Car className="size-8 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            Aucun véhicule pour le moment. Ajoutes-en un avec le bouton
            ci-dessus.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => {
            const status = statusStyles[vehicle.status_verification];
            return (
              <div
                key={vehicle.id}
                className="overflow-hidden border border-border bg-card"
              >
                <div className="relative h-70 w-full bg-background">
                  {vehicle.photo_url ? (
                    <Image
                      src={vehicle.photo_url}
                      alt={`${vehicle.marque} ${vehicle.modele}`}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Car className="size-10 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-foreground">
                        {vehicle.marque} {vehicle.modele}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {vehicle.plaque_number}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 px-2.5 py-1 text-xs font-semibold ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
