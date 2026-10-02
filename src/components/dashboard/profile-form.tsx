"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfileAction } from "@/app/actions/profile";
import {
  updateProfileSchema,
  type UpdateProfileValues,
} from "@/lib/schemas/profile";
import type { CurrentUser } from "@/lib/session";

export function ProfileForm({ user }: { user: CurrentUser }) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverFieldErrors, setServerFieldErrors] = useState<
    Record<string, string[]>
  >({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  const onSubmit = (values: UpdateProfileValues) => {
    setServerError(null);
    setServerFieldErrors({});
    startTransition(async () => {
      const result = await updateProfileAction(values);
      if (result?.success) {
        toast.success("Profil mis à jour.");
        return;
      }
      if (result?.message) setServerError(result.message);
      if (result?.fieldErrors) setServerFieldErrors(result.fieldErrors);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="name">Nom complet</Label>
          <Input
            id="name"
            type="text"
            className="rounded-none"
            {...register("name")}
          />
          {(errors.name?.message || serverFieldErrors.name) && (
            <p className="text-xs text-destructive">
              {errors.name?.message ?? serverFieldErrors.name[0]}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Adresse email</Label>
          <Input
            id="email"
            type="email"
            className="rounded-none"
            {...register("email")}
          />
          {(errors.email?.message || serverFieldErrors.email) && (
            <p className="text-xs text-destructive">
              {errors.email?.message ?? serverFieldErrors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            type="tel"
            className="rounded-none"
            {...register("phone")}
          />
          {(errors.phone?.message || serverFieldErrors.phone) && (
            <p className="text-xs text-destructive">
              {errors.phone?.message ?? serverFieldErrors.phone[0]}
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
        Mettre à jour
      </Button>
    </form>
  );
}
