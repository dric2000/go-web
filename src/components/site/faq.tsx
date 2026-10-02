"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fadeLeft, fadeUp, viewportOnce } from "@/lib/motion";

const faqs = [
  {
    question: "Comment fonctionne GO ?",
    answer:
      "GO met en relation des conducteurs qui ont des places libres sur un trajet et des voyageurs qui vont dans la même direction. Un conducteur publie son trajet (ville de départ, ville d'arrivée, date et prix par place), et les voyageurs réservent directement les places disponibles.",
  },
  {
    question: "Y a-t-il des frais supplémentaires ?",
    answer:
      "Non. Tu payes exactement le prix par place affiché, multiplié par le nombre de places réservées, aucun frais caché n'est ajouté au moment du paiement.",
  },
  {
    question: "Comment se déroule le paiement ?",
    answer:
      "Le paiement se fait en ligne au moment de la réservation. Les fonds restent bloqués jusqu'à la fin du trajet, puis sont débloqués pour le conducteur une fois le trajet confirmé.",
  },
  {
    question: "Comment devenir conducteur sur GO ?",
    answer:
      "Depuis ton compte, tu soumets ta pièce d'identité puis ton permis de conduire. Une fois ces deux étapes vérifiées par notre équipe, tu peux ajouter ton véhicule et publier tes premiers trajets.",
  },
  {
    question: "Dans quelles villes GO est disponible ?",
    answer:
      "GO couvre aujourd'hui les trajets entre Cotonou, Porto-Novo, Parakou, Natitingou, Abomey et Bohicon, avec de nouvelles villes à venir progressivement.",
  },
];

export function Faq() {
  return (
    <section
      id="aide"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24"
    >
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeLeft}
        >
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Des questions ? <br /> On a les réponses.
          </h2>
          <p className="mt-4 max-w-md text-base text-muted-foreground">
            Tout ce qu&apos;il faut savoir avant de réserver ou de publier
            ton premier trajet sur GO.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`}>
                <AccordionTrigger className="py-4 text-base font-semibold text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
