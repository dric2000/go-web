"use client";

import { useState } from "react";
import { Receipt } from "lucide-react";
import { isIncomingEntry } from "@/lib/wallet-display";
import type { WalletHistoryEntry } from "@/lib/wallet";
import { WalletHistoryRow } from "@/components/dashboard/wallet-history-row";

const filterTabs = ["Tout", "Entrées", "Sorties"] as const;

export function WalletTransactionsList({
  history,
  isDriver,
}: {
  history: WalletHistoryEntry[];
  isDriver: boolean;
}) {
  const [filter, setFilter] = useState<(typeof filterTabs)[number]>("Tout");

  const filtered = history.filter((entry) => {
    if (filter === "Tout") return true;
    const incoming = isIncomingEntry(entry, isDriver);
    return filter === "Entrées" ? incoming : !incoming;
  });

  return (
    <div>
      <div className="flex gap-1.5 border border-border p-1">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={
              filter === tab
                ? "flex-1 bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"
                : "flex-1 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-background"
            }
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 border border-dashed border-border py-16 text-center">
            <Receipt className="size-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Aucune transaction ici pour le moment.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((entry) => (
              <WalletHistoryRow
                key={`${entry.kind}-${entry.id}`}
                entry={entry}
                isDriver={isDriver}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
