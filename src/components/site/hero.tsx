"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PlayStoreButton } from "@/components/site/play-store-button";
import heroCar from "@assets/hero-car.png";
import Image from "next/image";
import Link from "next/link";
import { fadeRight, fadeUp } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <svg
        aria-hidden
        viewBox="0 0 500 400"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] text-foreground/15 md:block"
        fill="none"
      >
        <path
          d="M40 260 C 120 260, 140 180, 220 170 S 340 90, 430 60"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 8"
          strokeLinecap="round"
        />
        <path
          d="M300 340 C 360 300, 380 220, 460 190"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 8"
          strokeLinecap="round"
        />
        <circle cx="40" cy="260" r="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="430" cy="60" r="6" stroke="currentColor" strokeWidth="2" />
        <polygon points="222,178 236,170 226,190" fill="currentColor" />
      </svg>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-start gap-10 px-4 py-16 text-left sm:px-6 md:flex-row md:justify-between md:gap-8 md:py-24">
        <motion.div
          className="max-w-sm shrink-0"
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            Voyagez <br /> Ensemble, <br />{" "}
            <span className="text-primary">Economisez</span>
          </h1>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            Réserve une place ou propose ton trajet <br /> entre les grandes
            villes du pays. Simple, <br /> économique, et toujours dans la
            bonne <br /> ambiance.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PlayStoreButton />
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-6"
            >
              <Link href="#comment-ca-marche">Comment ça marche</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="hidden w-full min-w-0 max-w-md md:block md:max-w-4xl"
          initial="hidden"
          animate="show"
          variants={fadeRight}
        >
          <Image
            src={heroCar}
            alt="Un conducteur et ses passagers souriants dans une voiture GO"
            className="h-auto w-full"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
