import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import logo from "@assets/go-1.png";
import { legalLinks, siteNavLinks } from "@/lib/site-links";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "./social-icons";
import { ContactForm } from "./contact-form";

const socials = [
  { href: "#", label: "LinkedIn", icon: LinkedinIcon },
  { href: "#", label: "Instagram", icon: InstagramIcon },
  { href: "#", label: "Facebook", icon: FacebookIcon },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.4fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image src={logo} alt="GO" className="h-8 w-8" />
              <span className="text-lg font-bold text-brand">GO</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Le covoiturage inter-urbain simple, économique et chaleureux au
              Bénin.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Navigation
            </h3>
            <ul className="mt-4 space-y-3">
              {siteNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Légal</h3>
            <ul className="mt-4 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div id="contact">
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:contact@goapp.bj"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="size-4" />
                  contact@goapp.bj
                </a>
              </li>
            </ul>
            <ContactForm />
          </div>
        </div>
      </div>

      <div className="bg-primary">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-5 text-primary-foreground sm:flex-row sm:justify-between sm:px-6">
          <p className="text-sm">
            © {new Date().getFullYear()} GO. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-primary-foreground/90 transition-colors hover:text-primary-foreground"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
