import Link from "next/link";
import { redirect } from "next/navigation";
import { Lock, Receipt, ShieldCheck } from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import { getWallet, getWalletHistory } from "@/lib/wallet";
import { formatFcfa } from "@/lib/format";
import { WalletHistoryRow } from "@/components/dashboard/wallet-history-row";
import { PayoutSheet } from "@/components/dashboard/payout-sheet";

const PREVIEW_COUNT = 5;

export default async function WalletPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [wallet, history] = await Promise.all([
    user.is_driver ? getWallet() : Promise.resolve(null),
    getWalletHistory(user.is_driver),
  ]);

  const preview = history.slice(0, PREVIEW_COUNT);

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground">Portefeuille</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {user.is_driver
          ? "Ton solde et l'historique de tes transactions."
          : "L'historique de tes paiements."}
      </p>

      {user.is_driver && wallet && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="border border-border bg-card p-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              Solde disponible
            </p>
            <p className="mt-2 text-3xl font-bold text-primary">
              {formatFcfa(wallet.solde_disponible)}
            </p>
            <div className="mt-4">
              <PayoutSheet soldeDisponible={wallet.solde_disponible} />
            </div>
          </div>

          <div className="border border-border bg-card p-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              Fonds bloqués
            </p>
            <p className="mt-2 text-3xl font-bold text-foreground">
              {formatFcfa(wallet.solde_bloque)}
            </p>
            <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
              <Lock className="mt-0.5 size-3.5 shrink-0" />
              Séquestrés jusqu&apos;à la fin du trajet, puis débloqués
              automatiquement.
            </p>
          </div>
        </div>
      )}

      {!user.is_driver && (
        <Link
          href="/dashboard/become-driver"
          className="mt-6 flex items-center gap-3 border border-border bg-card p-4 transition-colors hover:border-primary/40"
        >
          <span className="flex size-11 shrink-0 items-center justify-center bg-brand/10 text-brand">
            <ShieldCheck className="size-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Deviens conducteur
            </p>
            <p className="text-xs text-muted-foreground">
              Publie tes trajets et commence à gagner de l&apos;argent.
            </p>
          </div>
        </Link>
      )}

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-sm font-bold text-foreground">
          Transactions récentes
        </h2>
        {history.length > 0 && (
          <Link
            href="/dashboard/wallet/transactions"
            className="text-sm font-medium text-primary hover:underline"
          >
            Voir tout
          </Link>
        )}
      </div>

      <div className="mt-4">
        {preview.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 border border-dashed border-border py-16 text-center">
            <Receipt className="size-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Aucune transaction pour le moment.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {preview.map((entry) => (
              <WalletHistoryRow
                key={`${entry.kind}-${entry.id}`}
                entry={entry}
                isDriver={user.is_driver}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
