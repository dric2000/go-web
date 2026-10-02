import Link from "next/link";
import { Plus } from "lucide-react";

export function CreateTripFab() {
  return (
    <Link
      href="/dashboard/trips/create"
      aria-label="Créer un trajet"
      className="fixed right-6 bottom-6 z-50 flex size-14 items-center justify-center bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
    >
      <Plus className="size-6" />
    </Link>
  );
}
