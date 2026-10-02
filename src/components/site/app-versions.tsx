"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, Download } from "lucide-react";
import { appVersions } from "@/lib/app-versions";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function AppVersions() {
  return (
    <section id="versions" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <motion.div
        className="mx-auto max-w-xl text-center"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Téléchargements
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Versions disponibles
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          Chaque nouvelle version est listée ici, avec ce qu&apos;elle
          apporte.
        </p>
      </motion.div>

      <motion.div
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {appVersions.map((version, index) => (
          <motion.div
            key={version.version}
            variants={fadeUp}
            className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-foreground">
                Version {version.version}
              </h3>
              <span
                className={`shrink-0 px-2.5 py-1 text-xs font-semibold ${
                  index === 0
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {index === 0 ? "Dernière version" : version.label}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {version.date}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              {version.description}
            </p>

            <ul className="mt-5 flex-1 space-y-2.5">
              {version.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href={version.downloadUrl}
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Download className="size-4" />
              Télécharger
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
