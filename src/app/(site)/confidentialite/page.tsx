import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";
import { privacyPolicy } from "@/lib/legal";
import { legalLinks } from "@/lib/site-links";

export const metadata: Metadata = {
  title: "Politique de confidentialité — GO",
  description:
    "Comment GO collecte, utilise et protège vos données personnelles.",
};

export default function PrivacyPolicyPage() {
  return <LegalPage document={privacyPolicy} related={legalLinks[1]} />;
}
