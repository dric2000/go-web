"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerAction } from "@/app/actions/auth";
import { registerSchema, type RegisterValues } from "@/lib/schemas/auth";

export function RegisterForm({ redirectTo }: { redirectTo?: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverFieldErrors, setServerFieldErrors] = useState<
    Record<string, string[]>
  >({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = (values: RegisterValues) => {
    setServerError(null);
    setServerFieldErrors({});
    startTransition(async () => {
      const result = await registerAction(values);
      if (result?.success) {
        toast.success("Compte créé avec succès, bienvenue sur GO !");
        router.push(redirectTo || "/dashboard");
        return;
      }
      if (result?.message) setServerError(result.message);
      if (result?.fieldErrors) setServerFieldErrors(result.fieldErrors);
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm space-y-4"
    >
      <div className="space-y-1.5">
        <Label htmlFor="name">Nom complet</Label>
        <Input
          id="name"
          type="text"
          className="h-11 rounded-none"
          {...register("name")}
        />
        {(errors.name?.message || serverFieldErrors.name) && (
          <p className="text-xs text-destructive">
            {errors.name?.message ?? serverFieldErrors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          className="h-11 rounded-none"
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
          placeholder="+229 01 23 45 67"
          className="h-11 rounded-none"
          {...register("phone")}
        />
        {(errors.phone?.message || serverFieldErrors.phone) && (
          <p className="text-xs text-destructive">
            {errors.phone?.message ?? serverFieldErrors.phone[0]}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          type="password"
          className="h-11 rounded-none"
          {...register("password")}
        />
        {(errors.password?.message || serverFieldErrors.password) && (
          <p className="text-xs text-destructive">
            {errors.password?.message ?? serverFieldErrors.password[0]}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password_confirmation">
          Confirmer le mot de passe
        </Label>
        <Input
          id="password_confirmation"
          type="password"
          className="h-11 rounded-none"
          {...register("password_confirmation")}
        />
        {errors.password_confirmation?.message && (
          <p className="text-xs text-destructive">
            {errors.password_confirmation.message}
          </p>
        )}
      </div>

      {serverError && (
        <p className="text-sm text-destructive">{serverError}</p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="h-11 w-full rounded-none"
      >
        {isPending && <Loader2 className="animate-spin" />}
        Créer mon compte
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Déjà un compte ?{" "}
        <Link
          href={redirectTo ? `/login?redirect=${redirectTo}` : "/login"}
          className="font-medium text-primary"
        >
          Se connecter
        </Link>
      </p>
    </form>
  );
}
