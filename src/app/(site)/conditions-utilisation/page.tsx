import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";
import { termsOfUse } from "@/lib/legal";
import { legalLinks } from "@/lib/site-links";

export const metadata: Metadata = {
  title: "Conditions d'utilisation — GO",
  description:
    "Les règles d'utilisation de GO pour les voyageurs et les conducteurs.",
};

export default function TermsOfUsePage() {
  return <LegalPage document={termsOfUse} related={legalLinks[0]} />;
}
