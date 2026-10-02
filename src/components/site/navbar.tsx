"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { PlayStoreButton } from "@/components/site/play-store-button";
import logo from "@assets/go-1.png";
import { siteNavLinks } from "@/lib/site-links";
import type { CurrentUser } from "@/lib/session";

export function Navbar({ user }: { user: CurrentUser | null }) {
  const [isOpen, setIsOpen] = useState(false);

  const links = user?.is_driver
    ? siteNavLinks.filter((link) => link.href !== "/#devenir-conducteur")
    : siteNavLinks;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="GO" className="h-8 w-8" priority />

        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href={user ? "/dashboard" : "/login"}
            className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
          >
            {user ? "Dashboard" : "Se connecter"}
          </Link>
          <PlayStoreButton />
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setIsOpen((open) => !open)}
          className="flex size-9 items-center justify-center rounded-full text-foreground md:hidden"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-border bg-card px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href={user ? "/dashboard" : "/login"}
            onClick={() => setIsOpen(false)}
            className="mt-4 block text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
          >
            {user ? "Dashboard" : "Se connecter"}
          </Link>
          <PlayStoreButton
            className="mt-4 w-full justify-center"
            onClick={() => setIsOpen(false)}
          />
        </div>
      )}
    </header>
  );
}
