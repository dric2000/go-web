"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { beninCities } from "@/lib/cities";
import type { TripSearchFilters } from "@/lib/trips";

export function TripSearchForm({
  initialFilters,
}: {
  initialFilters: TripSearchFilters;
}) {
  const router = useRouter();
  const [from, setFrom] = useState(initialFilters.from ?? "");
  const [to, setTo] = useState(initialFilters.to ?? "");
  const [date, setDate] = useState(initialFilters.date ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (date) params.set("date", date);
    const qs = params.toString();
    router.push(`/trajets${qs ? `?${qs}` : ""}`);
  };

  const swapCities = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex flex-1 items-end gap-2">
          <div className="flex-1 space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase">
              Départ
            </label>
            <Select value={from} onValueChange={setFrom}>
              <SelectTrigger className="w-full rounded-xl">
                <SelectValue placeholder="Ville de départ" />
              </SelectTrigger>
              <SelectContent>
                {beninCities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={swapCities}
            aria-label="Inverser les villes"
            className="mb-0.5 shrink-0 rounded-xl"
          >
            <ArrowLeftRight className="size-4" />
          </Button>

          <div className="flex-1 space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase">
              Arrivée
            </label>
            <Select value={to} onValueChange={setTo}>
              <SelectTrigger className="w-full rounded-xl">
                <SelectValue placeholder="Ville d'arrivée" />
              </SelectTrigger>
              <SelectContent>
                {beninCities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-1.5 sm:w-44">
          <label className="text-xs font-semibold text-muted-foreground uppercase">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-9 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground"
          />
        </div>

        <Button type="submit" size="lg" className="rounded-xl sm:w-auto">
          <Search className="size-4" />
          Rechercher
        </Button>
      </div>
    </form>
  );
}
