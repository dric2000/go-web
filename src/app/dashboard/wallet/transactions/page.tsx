import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { getWalletHistory } from "@/lib/wallet";
import { WalletTransactionsList } from "@/components/dashboard/wallet-transactions-list";

export default async function WalletTransactionsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const history = await getWalletHistory(user.is_driver);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-xl font-bold text-foreground">Historique</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Toutes tes transactions, filtrables par type.
      </p>

      <div className="mt-6">
        <WalletTransactionsList history={history} isDriver={user.is_driver} />
      </div>
    </div>
  );
}
