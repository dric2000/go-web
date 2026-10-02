export type AppVersion = {
  version: string;
  date: string;
  label: string;
  description: string;
  features: string[];
  // TODO: remplacer par le vrai lien une fois la Release GitHub créée.
  downloadUrl: string;
};

export const appVersions: AppVersion[] = [
  {
    version: "1.0.0",
    date: "Octobre 2026",
    label: "Bêta",
    description:
      "Première version ouverte aux testeurs, tout le cœur de l'app GO.",
    features: [
      "Rechercher et réserver un trajet",
      "Publier un trajet en tant que conducteur",
      "Suivi en direct du trajet sur la carte",
      "Paiement sécurisé par Fedapay",
      "Portefeuille conducteur et demande de retrait",
      "Vérification d'identité et de permis de conduire",
    ],
    downloadUrl: "#",
  },
];
