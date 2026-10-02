"use client";

import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileDropField } from "@/components/dashboard/file-drop-field";
import { submitVehicleAction } from "@/app/actions/become-driver";
import { vehicleSchema, type VehicleValues } from "@/lib/schemas/become-driver";

export function AddVehicleForm({ onSuccess }: { onSuccess: () => void }) {
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
  } = useForm<VehicleValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: { marque: "", modele: "", plaqueNumber: "" },
  });

  const onSubmit = (values: VehicleValues) => {
    setServerError(null);
    setFieldErrors({});
    const formData = new FormData();
    formData.set("marque", values.marque);
    formData.set("modele", values.modele);
    formData.set("plaque_number", values.plaqueNumber);
    formData.set("photo", values.photo);

    startTransition(async () => {
      const result = await submitVehicleAction(formData);
      if (result?.success) {
        toast.success("Véhicule soumis avec succès !");
        onSuccess();
        return;
      }
      if (result?.message) setServerError(result.message);
      if (result?.fieldErrors) setFieldErrors(result.fieldErrors);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="marque">Marque</Label>
        <Input
          id="marque"
          type="text"
          placeholder="Ex: Toyota"
          className="rounded-none"
          {...register("marque")}
        />
        {(errors.marque?.message || fieldErrors.marque) && (
          <p className="text-xs text-destructive">
            {errors.marque?.message ?? fieldErrors.marque[0]}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="modele">Modèle</Label>
        <Input
          id="modele"
          type="text"
          placeholder="Ex: RAV4"
          className="rounded-none"
          {...register("modele")}
        />
        {(errors.modele?.message || fieldErrors.modele) && (
          <p className="text-xs text-destructive">
            {errors.modele?.message ?? fieldErrors.modele[0]}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="plaqueNumber">Plaque d&apos;immatriculation</Label>
        <Input
          id="plaqueNumber"
          type="text"
          placeholder="Ex: BJ-1234-RB"
          className="rounded-none"
          {...register("plaqueNumber")}
        />
        {(errors.plaqueNumber?.message || fieldErrors.plaque_number) && (
          <p className="text-xs text-destructive">
            {errors.plaqueNumber?.message ?? fieldErrors.plaque_number[0]}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>Photo du véhicule</Label>
        <Controller
          control={control}
          name="photo"
          render={({ field }) => (
            <FileDropField
              file={field.value}
              onChange={field.onChange}
              label="Choisir une photo claire du véhicule"
              accept="image/*"
            />
          )}
        />
        {errors.photo && (
          <p className="text-xs text-destructive">{errors.photo.message}</p>
        )}
      </div>

      {serverError && (
        <p className="text-sm text-destructive">{serverError}</p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full rounded-none"
      >
        {isPending && <Loader2 className="animate-spin" />}
        Ajouter le véhicule
      </Button>
    </form>
  );
}
