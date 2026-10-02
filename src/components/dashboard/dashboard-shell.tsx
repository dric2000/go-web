"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { CreateTripFab } from "./create-trip-fab";
import type { CurrentUser } from "@/lib/session";

type DashboardShellProps = {
  user: CurrentUser;
  children: React.ReactNode;
};

export function DashboardShell({ user, children }: DashboardShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        mobileOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar user={user} onMenuClick={() => setMobileNavOpen(true)} />
        <main className="flex-1 bg-background p-4 sm:p-6">{children}</main>
      </div>
      {user.is_driver && <CreateTripFab />}
    </div>
  );
}
