import Link from "next/link";
import { Play } from "lucide-react";
import { cn } from "cn";

// Style calqué sur un badge de store, mais l'app n'est pas (encore) publiée
// sur le Play Store — on distribue l'APK directement, donc le lien renvoie
// vers notre propre page de téléchargement, et le texte ne prétend pas
// "Google Play".
export function PlayStoreButton({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/app"
      onClick={onClick}
      className={cn(
        "inline-flex h-9 shrink-0 items-center gap-2 rounded-xl bg-foreground px-4 text-background transition-colors hover:bg-foreground/90",
        className,
      )}
    >
      <Play className="size-4 shrink-0 fill-current" />
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[9px] text-background/70">Disponible pour</span>
        <span className="text-xs font-semibold">Android</span>
      </span>
    </Link>
  );
}
