"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Download, Smartphone } from "lucide-react";
import mockup from "@assets/go-mockup-2.png";
import { appVersions } from "@/lib/app-versions";
import { fadeLeft, fadeRight, viewportOnce } from "@/lib/motion";

export function DownloadHero() {
  const latest = appVersions[0];

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-0 size-128 -translate-y-1/2 translate-x-1/3 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 py-16 sm:px-6 md:flex-row md:justify-between md:py-24">
        <motion.div
          className="max-w-md text-center md:text-left"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeLeft}
        >
          <span className="inline-flex items-center gap-1.5 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Smartphone className="size-3.5" />
            Version {latest.version} · {latest.label}
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Télécharge l&apos;application GO
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Réserve une place ou publie ton trajet en quelques clics, où que
            tu sois au Bénin. Disponible pour Android.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
            <Link
              href={latest.downloadUrl}
              className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Download className="size-4" />
              Télécharger l&apos;APK
            </Link>
            <Link
              href="#versions"
              className="flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-card"
            >
              Voir les versions
            </Link>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Application en version bêta - tes retours nous aident à
            l&apos;améliorer.
          </p>
        </motion.div>

        <motion.div
          className="w-full max-w-sm sm:max-w-lg"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeRight}
        >
          <Image
            src={mockup}
            alt="Aperçu de l'application GO : recherche de trajet et suivi en direct"
            className="h-auto w-full"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
