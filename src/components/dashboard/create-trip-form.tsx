"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createTripAction } from "@/app/actions/trips";
import {
  createTripSchema,
  type CreateTripInput,
  type CreateTripValues,
} from "@/lib/schemas/trip";
import { beninCities } from "@/lib/cities";
import type { Vehicle } from "@/lib/vehicles";

export function CreateTripForm({ vehicles }: { vehicles: Vehicle[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>(
    {},
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTripInput, unknown, CreateTripValues>({
    resolver: zodResolver(createTripSchema),
    defaultValues: {
      vehicleId: String(vehicles[0]?.id ?? ""),
      departureCity: beninCities[0],
      arrivalCity: beninCities[1],
      pickupPoint: "",
      departureAt: "",
      seatsTotal: 3,
      pricePerSeat: 3000,
    },
  });

  const onSubmit = (values: CreateTripValues) => {
    setServerError(null);
    setFieldErrors({});
    startTransition(async () => {
      const result = await createTripAction(values);
      if (result?.success) {
        toast.success("Trajet publié avec succès !");
        router.push("/dashboard/trips");
        return;
      }
      if (result?.message) setServerError(result.message);
      if (result?.fieldErrors) setFieldErrors(result.fieldErrors);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label>Véhicule</Label>
          <Controller
            control={control}
            name="vehicleId"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full rounded-none">
                  <SelectValue placeholder="Choisir un véhicule" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={String(vehicle.id)}>
                      {vehicle.marque} {vehicle.modele} —{" "}
                      {vehicle.plaque_number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {(errors.vehicleId?.message || fieldErrors.vehicle_id) && (
            <p className="text-xs text-destructive">
              {errors.vehicleId?.message ?? fieldErrors.vehicle_id[0]}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label>Point de rendez-vous</Label>
          <Input
            type="text"
            placeholder="Ex: Carrefour zone industrielle"
            className="rounded-none"
            {...register("pickupPoint")}
          />
          {(errors.pickupPoint?.message || fieldErrors.pickup_point) && (
            <p className="text-xs text-destructive">
              {errors.pickupPoint?.message ?? fieldErrors.pickup_point[0]}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label>Ville de départ</Label>
          <Controller
            control={control}
            name="departureCity"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full rounded-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  {beninCities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-1.5">
          <Label>Ville d&apos;arrivée</Label>
          <Controller
            control={control}
            name="arrivalCity"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full rounded-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  {beninCities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-1.5">
          <Label>Date et heure de départ</Label>
          <Input
            type="datetime-local"
            className="rounded-none"
            {...register("departureAt")}
          />
          {(errors.departureAt?.message || fieldErrors.departure_at) && (
            <p className="text-xs text-destructive">
              {errors.departureAt?.message ?? fieldErrors.departure_at[0]}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label>Places disponibles</Label>
          <Input
            type="number"
            min={1}
            className="rounded-none"
            {...register("seatsTotal")}
          />
          {(errors.seatsTotal?.message || fieldErrors.seats_total) && (
            <p className="text-xs text-destructive">
              {errors.seatsTotal?.message ?? fieldErrors.seats_total[0]}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label>Prix par place (FCFA)</Label>
          <Input
            type="number"
            min={1}
            className="rounded-none"
            {...register("pricePerSeat")}
          />
          {(errors.pricePerSeat?.message || fieldErrors.price_per_seat) && (
            <p className="text-xs text-destructive">
              {errors.pricePerSeat?.message ?? fieldErrors.price_per_seat[0]}
            </p>
          )}
        </div>
      </div>

      {serverError && (
        <p className="text-sm text-destructive">{serverError}</p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full rounded-none sm:w-auto"
      >
        {isPending && <Loader2 className="animate-spin" />}
        Publier le trajet
      </Button>
    </form>
  );
}
