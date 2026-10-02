"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { CheckCircle2, Loader2, Lock } from "lucide-react";
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
import { FileDropField } from "@/components/dashboard/file-drop-field";
import type { CurrentUser, VerificationStatus } from "@/lib/session";
import {
  submitIdentityAction,
  submitLicenseAction,
} from "@/app/actions/become-driver";
import {
  identitySchema,
  licenseSchema,
  type IdentityValues,
  type LicenseValues,
} from "@/lib/schemas/become-driver";

const statusMeta = {
  pending: {
    label: "En attente de vérification",
    className: "bg-amber-500/10 text-amber-600",
  },
  approved: {
    label: "Vérifié",
    className: "bg-emerald-500/10 text-emerald-600",
  },
  rejected: {
    label: "Rejeté",
    className: "bg-destructive/10 text-destructive",
  },
} as const;

export function BecomeDriverStatus({ user }: { user: CurrentUser }) {
  const identityApproved = user.identity_status === "approved";
  const licenseApproved = user.license_status === "approved";

  return (
    <div className="space-y-6">
      <Panel index={1} title="Vérification d'identité" status={user.identity_status}>
        {identityApproved ? (
          <Done label="Ton identité a bien été vérifiée." />
        ) : user.identity_status === "pending" ? (
          <Pending label="Ton document est en cours de vérification par notre équipe." />
        ) : (
          <>
            {user.identity_status === "rejected" && (
              <p className="mb-4 text-sm text-destructive">
                Ton document a été rejeté. Soumets-en un nouveau ci-dessous.
              </p>
            )}
            <IdentityForm />
          </>
        )}
      </Panel>

      <Panel
        index={2}
        title="Permis de conduire"
        status={user.license_status}
        locked={!identityApproved}
        lockedMessage="Débloqué une fois ton identité vérifiée."
      >
        {licenseApproved ? (
          <Done label="Ton profil conducteur est approuvé." />
        ) : user.license_status === "pending" ? (
          <Pending label="Ta demande est en cours de vérification par notre équipe." />
        ) : user.license_status === "rejected" ? (
          <p className="text-sm text-destructive">
            Ta demande a été rejetée. Contacte le support pour plus
            d&apos;informations.
          </p>
        ) : (
          <LicenseForm />
        )}
      </Panel>
    </div>
  );
}

function Panel({
  index,
  title,
  status,
  locked,
  lockedMessage,
  children,
}: {
  index: number;
  title: string;
  status?: VerificationStatus;
  locked?: boolean;
  lockedMessage?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-border bg-card p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-7 shrink-0 items-center justify-center bg-brand/10 text-xs font-bold text-brand">
            {index}
          </span>
          <h2 className="text-sm font-bold text-foreground">{title}</h2>
        </div>
        {status && (
          <span
            className={`shrink-0 px-2.5 py-1 text-xs font-semibold ${statusMeta[status].className}`}
          >
            {statusMeta[status].label}
          </span>
        )}
      </div>

      <div className="mt-5">
        {locked ? (
          <div className="flex flex-col items-center gap-2 border border-dashed border-border py-10 text-center">
            <Lock className="size-5 text-muted-foreground" />
            <p className="max-w-xs text-sm text-muted-foreground">
              {lockedMessage}
            </p>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

function Done({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-foreground">
      <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
      {label}
    </div>
  );
}

function Pending({ label }: { label: string }) {
  return <p className="text-sm text-muted-foreground">{label}</p>;
}

function IdentityForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IdentityValues>({
    resolver: zodResolver(identitySchema),
    defaultValues: { documentType: "CNI" },
  });

  const onSubmit = (values: IdentityValues) => {
    setServerError(null);
    const formData = new FormData();
    formData.set("document_type", values.documentType);
    formData.set("file", values.file);

    startTransition(async () => {
      const result = await submitIdentityAction(formData);
      if (result?.success) {
        toast.success("Document envoyé, en attente de vérification.");
        router.refresh();
        return;
      }
      setServerError(result?.message ?? "Une erreur est survenue.");
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label>Type de document</Label>
          <Controller
            control={control}
            name="documentType"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full rounded-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="CNI">CNI</SelectItem>
                  <SelectItem value="PASSPORT">Passeport</SelectItem>
                  <SelectItem value="CIP">CIP</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-1.5">
          <Label>Photo du document</Label>
          <Controller
            control={control}
            name="file"
            render={({ field }) => (
              <FileDropField
                file={field.value}
                onChange={field.onChange}
                label="Choisir une photo nette du document"
                accept="image/*,application/pdf"
              />
            )}
          />
          {errors.file && (
            <p className="text-xs text-destructive">{errors.file.message}</p>
          )}
        </div>
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
        Envoyer
      </Button>
    </form>
  );
}

function LicenseForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>(
    {},
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LicenseValues>({
    resolver: zodResolver(licenseSchema),
    defaultValues: { licenseNumber: "" },
  });

  const onSubmit = (values: LicenseValues) => {
    setServerError(null);
    setFieldErrors({});
    startTransition(async () => {
      const result = await submitLicenseAction(values);
      if (result?.success) {
        toast.success("Demande envoyée, en attente de vérification.");
        router.refresh();
        return;
      }
      if (result?.message) setServerError(result.message);
      if (result?.fieldErrors) setFieldErrors(result.fieldErrors);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="licenseNumber">Numéro de permis de conduire</Label>
        <Input
          id="licenseNumber"
          type="text"
          className="rounded-none"
          {...register("licenseNumber")}
        />
        {(errors.licenseNumber?.message || fieldErrors.license_number) && (
          <p className="text-xs text-destructive">
            {errors.licenseNumber?.message ?? fieldErrors.license_number[0]}
          </p>
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
        Envoyer
      </Button>
    </form>
  );
}

