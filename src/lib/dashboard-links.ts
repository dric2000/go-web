import {
  Car,
  Route,
  ShieldCheck,
  Settings,
  User,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type DashboardLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

// "Mon profil", "Mes voitures", "Mes trajets", "Paramètres" demandés
// directement + deux ajouts : "Devenir conducteur" et "Portefeuille",
// qui correspondent à des flux déjà réels côté mobile/API (identité,
// véhicule, solde bloqué/débloqué) mais jamais encore exposés côté web.
export const dashboardLinks: DashboardLink[] = [
  { href: "/dashboard", label: "Mon profil", icon: User },
  { href: "/dashboard/trips", label: "Mes trajets", icon: Route },
  { href: "/dashboard/vehicles", label: "Mes voitures", icon: Car },
  {
    href: "/dashboard/become-driver",
    label: "Devenir conducteur",
    icon: ShieldCheck,
  },
  { href: "/dashboard/wallet", label: "Portefeuille", icon: Wallet },
  { href: "/dashboard/settings", label: "Paramètres", icon: Settings },
];
