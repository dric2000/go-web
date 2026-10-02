import Link from "next/link";
import { redirect } from "next/navigation";
import { Car, Eye, MapPin, ShieldCheck, Wallet } from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import { getMyVehicles } from "@/lib/vehicles";
import { CreateTripForm } from "@/components/dashboard/create-trip-form";

const tips = [
  {
    icon: Wallet,
    title: "Rémunération",
    text: "Ta rémunération reste bloquée le temps du trajet. Elle est débloquée dès que le passager confirme son arrivée, ou automatiquement 24h après la fin du trajet.",
  },
  {
    icon: Eye,
    title: "Visibilité immédiate",
    text: "Ton trajet est visible par les voyageurs dès sa publication, sans validation préalable.",
  },
  {
    icon: Car,
    title: "Places disponibles",
    text: "Indique un nombre de places cohérent avec la capacité réelle de ton véhicule, pour la sécurité de tes passagers.",
  },
  {
    icon: MapPin,
    title: "Point de rendez-vous",
    text: "Choisis un lieu clair et facile d'accès pour éviter les malentendus le jour du départ.",
  },
];

export default async function CreateTripPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  if (!user.is_driver) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="flex size-16 items-center justify-center bg-brand/10 text-brand">
          <ShieldCheck className="size-8" />
        </div>
        <h1 className="mt-4 text-xl font-bold text-foreground">
          Deviens conducteur pour publier un trajet
        </h1>
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

  if (vehicles.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="flex size-16 items-center justify-center bg-brand/10 text-brand">
          <ShieldCheck className="size-8" />
        </div>
        <h1 className="mt-4 text-xl font-bold text-foreground">
          Ajoute un véhicule avant de publier un trajet
        </h1>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Il te faut au moins un véhicule enregistré pour pouvoir créer un
          trajet.
        </p>
        <Link
          href="/dashboard/vehicles"
          className="mt-5 bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Ajouter un véhicule
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground">
        Publier un trajet
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Renseigne les détails de ton trajet pour le rendre disponible aux
        voyageurs.
      </p>

      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="border border-border bg-card p-6 lg:w-1/2">
          <CreateTripForm vehicles={vehicles} />
        </div>

        <aside className="grid gap-4 sm:grid-cols-2 lg:w-1/2 lg:shrink-0">
          {tips.map((tip) => (
            <div key={tip.title} className="border border-border bg-card p-4">
              <div className="flex size-8 items-center justify-center bg-brand/10 text-brand">
                <tip.icon className="size-4" />
              </div>
              <p className="mt-3 text-sm font-semibold text-foreground">
                {tip.title}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{tip.text}</p>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
