"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { beninCities } from "@/lib/cities";

const loop = Array.from({ length: 6 }).flatMap((_, i) =>
  beninCities.map((city) => ({ city, key: `${i}-${city}` })),
);

export function CitiesStrip() {
  return (
    <section className="py-10">
      <motion.div
        className="relative mt-6 overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-10 hover:paused">
          {loop.map(({ city, key }) => (
            <div
              key={key}
              className="flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-muted-foreground"
            >
              <MapPin className="size-4 text-primary" />
              {city}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
