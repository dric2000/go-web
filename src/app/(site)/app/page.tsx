import type { Metadata } from "next";
import { DownloadHero } from "@/components/site/download-hero";
import { AppVersions } from "@/components/site/app-versions";

export const metadata: Metadata = {
  title: "Télécharger l'app — GO",
};

export default function DownloadAppPage() {
  return (
    <>
      <DownloadHero />
      <AppVersions />
    </>
  );
}
