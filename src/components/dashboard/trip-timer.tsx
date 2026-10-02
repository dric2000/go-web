"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

function formatElapsed(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function TripTimer({ startedAt }: { startedAt: string }) {
  // Calculé uniquement côté client (useEffect) : le rendu serveur et
  // l'hydratation n'auraient pas la même valeur de Date.now() sinon.
  const [elapsed, setElapsed] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setElapsed(Date.now() - new Date(startedAt).getTime());
    tick();
    const intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, [startedAt]);

  return (
    <div className="flex items-center gap-2 border border-border bg-card px-4 py-3">
      <Clock className="size-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">Durée du trajet</span>
      <span className="ml-auto font-mono text-lg font-bold text-foreground">
        {elapsed === null ? "--:--:--" : formatElapsed(elapsed)}
      </span>
    </div>
  );
}
