"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CircleX, Flag, Loader2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  cancelTripAction,
  completeTripAction,
  startTripAction,
} from "@/app/actions/trips";
import type { TripStatus } from "@/lib/trips";

export function TripLifecycleActions({
  tripId,
  status,
}: {
  tripId: number;
  status: TripStatus;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  if (status !== "scheduled" && status !== "in_progress") {
    return null;
  }

  const run = (
    action: (id: number) => Promise<{ success?: boolean; message?: string }>,
  ) => {
    startTransition(async () => {
      const result = await action(tripId);
      if (result.success) {
        toast.success(result.message ?? "Trajet mis à jour.");
        router.refresh();
        return;
      }
      toast.error(result.message ?? "Une erreur est survenue.");
    });
  };

  const handleCancel = () => {
    if (
      !window.confirm(
        "Annuler ce trajet ? Cette action est irréversible et n'annule pas automatiquement les réservations déjà payées.",
      )
    ) {
      return;
    }
    run(cancelTripAction);
  };

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {status === "scheduled" && (
        <Button
          onClick={() => run(startTripAction)}
          disabled={isPending}
          className="rounded-none"
        >
          {isPending ? <Loader2 className="animate-spin" /> : <Play />}
          Démarrer le trajet
        </Button>
      )}

      {status === "in_progress" && (
        <Button
          onClick={() => run(completeTripAction)}
          disabled={isPending}
          className="rounded-none"
        >
          {isPending ? <Loader2 className="animate-spin" /> : <Flag />}
          Terminer le trajet
        </Button>
      )}

      <Button
        onClick={handleCancel}
        disabled={isPending}
        variant="destructive"
        className="rounded-none"
      >
        <CircleX />
        Annuler le trajet
      </Button>
    </div>
  );
}
