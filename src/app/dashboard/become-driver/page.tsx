import Link from "next/link";
import { redirect } from "next/navigation";
import { BadgeCheck } from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import { BecomeDriverStatus } from "@/components/dashboard/become-driver-status";

export default async function BecomeDriverPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  if (user.is_driver) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="flex size-16 items-center justify-center bg-brand/10 text-brand">
          <BadgeCheck className="size-8" />
        </div>
        <h1 className="mt-4 text-xl font-bold text-foreground">
          Vous êtes déjà conducteur
        </h1>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Ton profil conducteur est actif. Tu peux gérer tes véhicules ou
          publier un trajet directement depuis l&apos;app.
        </p>
        <Link
          href="/dashboard/vehicles"
          className="mt-5 bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Voir mes voitures
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-xl font-bold text-foreground">
        Devenir conducteur
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Vérifie ton identité puis ton permis pour pouvoir publier des
        trajets. Chaque étape se débloque une fois la précédente approuvée
        par notre équipe.
      </p>

      <div className="mt-6">
        <BecomeDriverStatus user={user} />
      </div>
    </div>
  );
}
