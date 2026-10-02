"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import mockup from "@assets/go-mockup.png";
import { PlayStoreButton } from "@/components/site/play-store-button";
import { fadeLeft, fadeRight, viewportOnce } from "@/lib/motion";

export function AppShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-15">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <motion.div
          className="flex justify-center md:justify-start"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeLeft}
        >
          <Image
            src={mockup}
            alt="Aperçu de l'application GO sur deux téléphones"
            className="w-full max-w-xs md:max-w-sm"
          />
        </motion.div>

        <motion.div
          className="text-center md:text-left"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeRight}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Simple et rapide
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Une application moderne
          </h2>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            On a conçu GO pour que réserver ou publier un trajet prenne
            quelques secondes. Recherche ta destination, choisis ton trajet
            et voyage l&apos;esprit tranquille avec des conducteurs vérifiés,
            un paiement sécurisé et <br /> un suivi en temps réel.
          </p>
          <div className="mt-8 flex justify-center md:justify-start">
            <PlayStoreButton />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
