import {
  ArrowDownLeft,
  ArrowUpRight,
  RotateCcw,
  Wallet as WalletIcon,
  type LucideIcon,
} from "lucide-react";
import { formatFcfa } from "@/lib/format";
import type { WalletHistoryEntry } from "@/lib/wallet";

export const walletStatusStyles: Record<
  string,
  { label: string; className: string }
> = {
  success: { label: "Réussi", className: "bg-emerald-500/10 text-emerald-600" },
  failed: { label: "Échoué", className: "bg-destructive/10 text-destructive" },
  pending: { label: "En attente", className: "bg-amber-500/10 text-amber-600" },
};

export const walletStatusFallback = walletStatusStyles.pending;

// Vrai si l'entrée fait rentrer de l'argent pour l'utilisateur connecté :
// un "payment" est un gain pour le conducteur mais une dépense pour le
// voyageur qui a réservé, et inversement pour un remboursement.
export function isIncomingEntry(
  entry: WalletHistoryEntry,
  isDriver: boolean,
): boolean {
  switch (entry.kind) {
    case "payment":
      return isDriver;
    case "refund":
      return !isDriver;
    case "payout":
      return false;
  }
}

export type EntryDisplay = {
  icon: LucideIcon;
  iconClassName: string;
  title: string;
  amountText: string;
  amountClassName: string;
  // Nom du voyageur qui a payé, affiché seulement côté conducteur.
  subtitleName?: string;
};

export function displayForEntry(
  entry: WalletHistoryEntry,
  isDriver: boolean,
): EntryDisplay {
  const amountStr = formatFcfa(entry.amount);

  if (entry.kind === "payment") {
    if (isDriver) {
      return {
        icon: ArrowDownLeft,
        iconClassName: "bg-emerald-500/10 text-emerald-600",
        title: entry.trip_label ?? "Paiement reçu",
        amountText: `+${amountStr}`,
        amountClassName: "text-emerald-600",
        subtitleName: entry.traveler_name ?? undefined,
      };
    }
    return {
      icon: ArrowUpRight,
      iconClassName: "bg-muted text-foreground",
      title: entry.trip_label ?? "Réservation",
      amountText: `-${amountStr}`,
      amountClassName: "text-foreground",
    };
  }

  if (entry.kind === "refund") {
    if (isDriver) {
      return {
        icon: RotateCcw,
        iconClassName: "bg-muted text-muted-foreground",
        title: entry.trip_label
          ? `${entry.trip_label} · remboursé`
          : "Remboursement",
        amountText: amountStr,
        amountClassName: "text-muted-foreground",
        subtitleName: entry.traveler_name ?? undefined,
      };
    }
    return {
      icon: RotateCcw,
      iconClassName: "bg-emerald-500/10 text-emerald-600",
      title: entry.trip_label
        ? `${entry.trip_label} · remboursé`
        : "Remboursement",
      amountText: `+${amountStr}`,
      amountClassName: "text-emerald-600",
    };
  }

  return {
    icon: WalletIcon,
    iconClassName: "bg-primary/10 text-primary",
    title: "Retrait",
    amountText: `-${amountStr}`,
    amountClassName: "text-foreground",
  };
}
