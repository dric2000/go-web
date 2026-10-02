"use client";

import { useEffect, useRef, useState } from "react";
import type L from "leaflet";
import "leaflet/dist/leaflet.css";

const POLL_INTERVAL_MS = 5000;

type Position = { lat: number; lng: number; updated_at: string | null };

export function TripLiveMap({ tripId }: { tripId: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [hasPosition, setHasPosition] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch(`/api/trips/${tripId}/position`);
        const data: Position = await res.json();
        if (cancelled || data.lat == null || data.lng == null) return;

        const leaflet = await import("leaflet");

        // Les icônes par défaut de Leaflet référencent des images via des
        // chemins relatifs que le bundler ne résout pas correctement ; on
        // les pointe explicitement vers le CDN pour éviter des marqueurs
        // cassés (problème connu de Leaflet avec Next.js/Webpack).
        delete (
          leaflet.Icon.Default.prototype as unknown as {
            _getIconUrl?: unknown;
          }
        )._getIconUrl;
        leaflet.Icon.Default.mergeOptions({
          iconRetinaUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });

        if (!mapRef.current && containerRef.current) {
          mapRef.current = leaflet.map(containerRef.current).setView(
            [data.lat, data.lng],
            14,
          );
          leaflet
            .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              attribution: "&copy; OpenStreetMap",
            })
            .addTo(mapRef.current);
        }

        if (mapRef.current) {
          if (!markerRef.current) {
            markerRef.current = leaflet
              .marker([data.lat, data.lng])
              .addTo(mapRef.current);
          } else {
            markerRef.current.setLatLng([data.lat, data.lng]);
          }
          mapRef.current.panTo([data.lat, data.lng]);
        }

        setHasPosition(true);
      } catch {
        // On réessaiera au prochain tick, pas besoin d'alarmer l'utilisateur
        // pour un poll raté isolé.
      }
    }

    poll();
    const intervalId = setInterval(poll, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
      mapRef.current?.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, [tripId]);

  return (
    <div className="relative h-80 w-full overflow-hidden border border-border">
      <div ref={containerRef} className="h-full w-full" />
      {!hasPosition && (
        <div className="absolute inset-0 flex items-center justify-center bg-card text-sm text-muted-foreground">
          En attente de la position du conducteur…
        </div>
      )}
    </div>
  );
}
