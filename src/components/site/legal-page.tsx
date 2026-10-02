import Link from "next/link";
import { ArrowRight, CalendarDays, Mail, ScrollText } from "lucide-react";
import type { LegalDocument } from "@/lib/legal";

type LegalPageProps = {
  document: LegalDocument;
  related: { href: string; label: string };
};

export function LegalPage({ document, related }: LegalPageProps) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 size-96 -translate-y-1/3 translate-x-1/4 rounded-full bg-primary/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <span className="inline-flex items-center gap-1.5 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <ScrollText className="size-3.5" />
            {document.eyebrow}
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-brand sm:text-4xl">
            {document.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {document.intro}
          </p>
          <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="size-4" />
            Dernière mise à jour : {document.updatedAt}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[220px_1fr] md:py-16">
        <aside className="md:sticky md:top-24 md:self-start">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-brand">
            Sommaire
          </h2>
          <ol className="mt-4 space-y-2 border-l border-border">
            {document.sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="-ml-px block border-l-2 border-transparent py-0.5 pl-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                >
                  {index + 1}. {section.title}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <div className="min-w-0">
          <div className="rounded-3xl bg-card p-6 shadow-sm sm:p-10">
            <div className="space-y-10">
              {document.sections.map((section, index) => (
                <article
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24"
                >
                  <h2 className="flex items-baseline gap-3 text-xl font-semibold text-foreground">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand text-xs font-bold text-brand-foreground">
                      {index + 1}
                    </span>
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground sm:pl-10">
                    {section.content.map((block, blockIndex) =>
                      typeof block === "string" ? (
                        <p key={blockIndex}>{block}</p>
                      ) : (
                        <ul key={blockIndex} className="space-y-2">
                          {block.map((item) => (
                            <li key={item} className="flex gap-3">
                              <span
                                aria-hidden
                                className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ),
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-6 rounded-3xl bg-brand/5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-semibold text-brand">Une question ?</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Notre équipe vous répond à propos de ce document.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <a
                href="mailto:contact@goapp.bj"
                className="flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Mail className="size-4" />
                Nous écrire
              </a>
              <Link
                href={related.href}
                className="flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-card"
              >
                {related.label}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
