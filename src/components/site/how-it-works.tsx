"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, Route, ShieldCheck, UserPlus } from "lucide-react";
import happyPerson from "@assets/happy.jpeg";
import { fadeLeft, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const steps = [
  {
    icon: UserPlus,
    title: "Inscrivez-vous",
    description:
      "Crée ton compte GO en quelques secondes avec ton numéro de téléphone, en tant que voyageur ou conducteur.",
  },
  {
    icon: Route,
    title: "Réservez un trajet ou créez le vôtre",
    description:
      "Trouve un trajet disponible entre deux villes, ou publie le tien si tu prends la route avec des places libres.",
  },
  {
    icon: ShieldCheck,
    title: "Payez et voyagez en sécurité",
    description:
      "Paye ta place par Mobile Money et voyage l'esprit tranquille, avec des conducteurs vérifiés.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-5">
      <motion.div
        className="mx-auto max-w-xl text-center"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Étapes simples
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Comment ça marche
        </h2>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          Pas de complications, juste un trajet réservé ou publié en
          quelques clics.
        </p>
      </motion.div>

      <div className="mt-16 grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <motion.div
          className="relative mx-auto w-full max-w-xs"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeLeft}
        >
          <div className="aspect-4/5 overflow-hidden rounded-3xl shadow-lg">
            <Image
              src={happyPerson}
              alt="Un conducteur heureux publie son trajet sur GO"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute top-8 -right-4 flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg sm:-right-6">
            <CheckCircle2 className="size-4" />
            Trajet confirmé
          </div>
        </motion.div>

        <motion.div
          className="relative space-y-10"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <div
            aria-hidden
            className="absolute top-6 bottom-6 left-5.5 w-px bg-border"
          />
          {steps.map(({ icon: Icon, title, description }) => (
            <motion.div key={title} className="relative flex gap-4" variants={fadeUp}>
              <div className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Icon className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
