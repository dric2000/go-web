"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { dashboardLinks } from "@/lib/dashboard-links";
import { cn } from "@/lib/utils";
import logo from "@assets/go-2.png";

type SidebarProps = {
  mobileOpen: boolean;
  onClose: () => void;
};

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const content = (
    <>
      <div className="flex h-16 items-center justify-between px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src={logo} alt="GO" className="h-8 w-8" />
          <span className="text-xl font-bold text-white">GO</span>
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer le menu"
          className="text-white/80 md:hidden"
        >
          <X className="size-5" />
        </button>
      </div>

      <nav className="flex flex-col gap-1 px-4 py-4">
        {dashboardLinks.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={
                isActive
                  ? "flex items-center gap-3 bg-white/15 px-3 py-2.5 text-sm font-medium text-white"
                  : "flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              }
            >
              <Icon className="size-4.5" />
              {label}
            </Link>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop : sidebar fixe */}
      <aside className="hidden w-64 shrink-0 flex-col bg-brand md:flex">
        {content}
      </aside>

      {/* Mobile : tiroir par-dessus le contenu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
            aria-hidden
          />
          <aside
            className={cn("absolute inset-y-0 left-0 flex w-64 flex-col bg-brand")}
          >
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
