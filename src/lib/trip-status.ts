export const bookingStatusStyles: Record<
  string,
  { label: string; className: string }
> = {
  paid: { label: "Confirmé", className: "bg-emerald-500/10 text-emerald-600" },
  canceled: { label: "Annulé", className: "bg-destructive/10 text-destructive" },
  pending_payment: {
    label: "En attente",
    className: "bg-amber-500/10 text-amber-600",
  },
};

export const bookingStatusFallback = {
  label: "En attente",
  className: "bg-amber-500/10 text-amber-600",
};

export const tripStatusStyles: Record<
  string,
  { label: string; className: string }
> = {
  scheduled: {
    label: "Prêt à démarrer",
    className: "bg-amber-500/10 text-amber-600",
  },
  in_progress: { label: "En cours", className: "bg-blue-500/10 text-blue-600" },
  completed: { label: "Terminé", className: "bg-brand/10 text-brand" },
  canceled: { label: "Annulé", className: "bg-destructive/10 text-destructive" },
};
