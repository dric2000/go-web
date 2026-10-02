"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ctaImage from "@assets/cta.png";
import { fadeUp, viewportOnce } from "@/lib/motion";

// Comme si la voiture arrivait en roulant depuis la gauche de l'écran :
// grand déplacement horizontal + décélération en fin de course, plutôt
// que le fadeUp standard utilisé ailleurs sur la page.
const driveIn: Variants = {
  hidden: { opacity: 0, x: "-35%" },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Cta() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              Prêt à prendre la route ?
            </h2>
            <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
              Rejoins des milliers de voyageurs et conducteurs qui partagent
              déjà leurs trajets au Bénin avec GO.
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0 rounded-full px-8">
            <Link href="/login">Se connecter</Link>
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="mx-auto mt-8 max-w-[1600px] md:mt-10"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={driveIn}
      >
        <Image
          src={ctaImage}
          alt="Un conducteur GO souriant, téléphone en main, à côté de sa voiture"
          className="h-auto w-full"
          sizes="100vw"
        />
      </motion.div>
    </section>
  );
}
