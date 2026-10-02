"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, LogIn, Mail, UserPlus } from "lucide-react";

const guestLinks = [
  { href: "/register", label: "Inscription", icon: UserPlus },
  { href: "/login", label: "Connexion", icon: LogIn },
  { href: "/#contact", label: "Contact", icon: Mail },
];

const authLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/#contact", label: "Contact", icon: Mail },
];

// Chiffres provisoires (pas encore de vraie source), à remplacer par un
// vrai comptage côté go-api quand on en aura besoin.
const stats = [
  { value: 86, suffix: "", label: "Conducteurs" },
  { value: 100, suffix: "+", label: "Voyageurs" },
  { value: 6, suffix: "", label: "Villes couvertes" },
];

export function LeftRail({ isAuthenticated }: { isAuthenticated: boolean }) {
  const menuLinks = isAuthenticated ? authLinks : guestLinks;

  return (
    <div className="fixed top-28 left-10 z-40 hidden flex-col items-start gap-5 rounded-2xl border border-border bg-card/90 px-6 py-5 shadow-lg backdrop-blur xl:flex">
      {menuLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="flex items-center gap-2.5 text-sm font-semibold whitespace-nowrap text-muted-foreground uppercase tracking-widest transition-colors hover:text-foreground"
        >
          <link.icon className="size-4 shrink-0" />
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export function RightRail() {
  return (
    <div className="fixed right-10 bottom-12 z-40 hidden flex-col items-end gap-4 rounded-2xl border border-border bg-card/90 px-6 py-5 shadow-lg backdrop-blur xl:flex">
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-baseline gap-2">
          <p className="text-4xl leading-none font-bold text-primary">
            <AnimatedNumber value={stat.value} />
            {stat.suffix}
          </p>
          <p className="text-sm font-semibold whitespace-nowrap text-muted-foreground uppercase tracking-widest">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const duration = 1400;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [value]);

  return <>{display}</>;
}
