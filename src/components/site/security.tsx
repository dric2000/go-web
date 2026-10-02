"use client";

import { motion } from "framer-motion";
import { BadgeCheck, LocateFixed, Wallet } from "lucide-react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const pillars = [
  {
    icon: BadgeCheck,
    title: "Conducteurs vérifiés",
    description:
      "Nous vérifions l'identité de chaque conducteur et l'authenticité de son véhicule avant de le laisser publier un trajet.",
  },
  {
    icon: Wallet,
    title: "Paiement protégé",
    description:
      "Tu ne payes que pour le trajet que tu utilises. Les fonds restent bloqués jusqu'à la fin de la course, puis sont reversés au conducteur.",
  },
  {
    icon: LocateFixed,
    title: "Suivi en temps réel",
    description:
      "Chaque trajet est suivi en direct, du départ jusqu'à l'arrivée, pour la tranquillité du conducteur comme des passagers.",
  },
];

export function Security() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <motion.div
        className="rounded-3xl bg-brand/5 px-6 py-12 sm:px-10 sm:py-16"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            Sécurité
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand sm:text-4xl">
            Votre sécurité, notre priorité
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="rounded-2xl bg-card p-6 shadow-sm"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-brand-foreground">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
