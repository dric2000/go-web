import { displayForEntry, walletStatusFallback, walletStatusStyles } from "@/lib/wallet-display";
import { formatDateTime } from "@/lib/format";
import type { WalletHistoryEntry } from "@/lib/wallet";

export function WalletHistoryRow({
  entry,
  isDriver,
}: {
  entry: WalletHistoryEntry;
  isDriver: boolean;
}) {
  const display = displayForEntry(entry, isDriver);
  const status = walletStatusStyles[entry.status] ?? walletStatusFallback;
  const Icon = display.icon;

  return (
    <div className="flex items-center gap-3 border border-border bg-card p-4">
      <span
        className={`flex size-10 shrink-0 items-center justify-center ${display.iconClassName}`}
      >
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">
          {display.title}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {display.subtitleName ? `${display.subtitleName} · ` : ""}
          {formatDateTime(entry.created_at)}
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className={`text-sm font-bold ${display.amountClassName}`}>
          {display.amountText}
        </p>
        <span
          className={`mt-1 inline-block px-2 py-0.5 text-[10px] font-semibold ${status.className}`}
        >
          {status.label}
        </span>
      </div>
    </div>
  );
}
