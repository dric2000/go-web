"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { requestPayoutAction } from "@/app/actions/wallet";
import { formatFcfa } from "@/lib/format";

export function PayoutSheet({ soldeDisponible }: { soldeDisponible: number }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const canWithdraw = soldeDisponible > 0;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const value = Number(amount);
    if (!value || value <= 0) {
      setError("Montant invalide.");
      return;
    }
    if (value > soldeDisponible) {
      setError("Montant supérieur au solde disponible.");
      return;
    }
    if (!/^[0-9]{8,10}$/.test(phoneNumber)) {
      setError("Numéro de téléphone invalide.");
      return;
    }

    startTransition(async () => {
      const result = await requestPayoutAction(value, phoneNumber);
      if (result.success) {
        toast.success(result.message ?? "Retrait initié, en cours de traitement.");
        setOpen(false);
        setAmount("");
        setPhoneNumber("");
        router.refresh();
        return;
      }
      setError(
        result.fieldErrors?.phone_number?.[0] ??
          result.message ??
          "Une erreur est survenue.",
      );
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="rounded-none" disabled={!canWithdraw}>
          Demander un retrait
        </Button>
      </SheetTrigger>
      <SheetContent className="rounded-none sm:max-w-sm">
        <SheetHeader>
          <SheetTitle>Demander un retrait</SheetTitle>
          <SheetDescription>
            Solde disponible : {formatFcfa(soldeDisponible)}
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={onSubmit} className="space-y-4 px-4 pb-4">
          <div className="space-y-1.5">
            <Label htmlFor="amount">Montant (FCFA)</Label>
            <Input
              id="amount"
              type="number"
              min={1}
              max={soldeDisponible}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="rounded-none"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phoneNumber">Numéro Mobile Money</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="Ex: 97000000"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="rounded-none"
            />
            <p className="text-xs text-muted-foreground">
              Le numéro sur lequel recevoir les fonds — pas forcément celui
              de ton compte.
            </p>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full rounded-none"
          >
            {isPending && <Loader2 className="animate-spin" />}
            Valider
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
