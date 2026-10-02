"use client";

import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "@/app/actions/auth";
import { loginSchema, type LoginValues } from "@/lib/schemas/auth";
import { FacebookIcon, GoogleIcon } from "@/components/site/social-icons";

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverFieldErrors, setServerFieldErrors] = useState<
    Record<string, string[]>
  >({});

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = (values: LoginValues) => {
    setServerError(null);
    setServerFieldErrors({});
    startTransition(async () => {
      const result = await loginAction(values);
      if (result?.success) {
        toast.success("Connexion réussie, bienvenue !");
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
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Ton adresse email"
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
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          className="h-11 rounded-none"
          {...register("password")}
        />
        {(errors.password?.message || serverFieldErrors.password) && (
          <p className="text-xs text-destructive">
            {errors.password?.message ?? serverFieldErrors.password[0]}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Controller
          control={control}
          name="remember"
          render={({ field }) => (
            <Checkbox
              id="remember"
              checked={field.value}
              onCheckedChange={field.onChange}
              className="rounded-none"
            />
          )}
        />
        <Label htmlFor="remember" className="text-sm font-normal">
          Se souvenir de moi
        </Label>
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
        Se connecter
      </Button>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">ou</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          disabled
          className="h-11 flex-1 rounded-none"
        >
          <GoogleIcon className="size-4" />
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled
          className="h-11 flex-1 rounded-none"
        >
          <FacebookIcon className="size-4" />
          Facebook
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Pas encore de compte ?{" "}
        <Link
          href={redirectTo ? `/register?redirect=${redirectTo}` : "/register"}
          className="font-medium text-primary"
        >
          S&apos;inscrire
        </Link>
      </p>
    </form>
  );
}
