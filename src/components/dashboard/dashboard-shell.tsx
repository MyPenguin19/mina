"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, LogOut, Store } from "lucide-react";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { AppearanceToggle } from "@/components/dashboard/appearance-toggle";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const TITLES: Record<string, string> = {
  "/dashboard": "Overview", "/dashboard/orders": "Orders", "/dashboard/tables": "Tables",
  "/dashboard/menu": "Menu", "/dashboard/offers": "Offers", "/dashboard/branding": "Branding",
  "/dashboard/staff": "Staff", "/dashboard/analytics": "Analytics", "/dashboard/qr": "QR Codes",
  "/dashboard/settings": "Settings",
};

export function DashboardShell({ restaurantName, role, signOut, children }: {
  restaurantName: string;
  role: string;
  signOut: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const title = TITLES[pathname] ?? "Dashboard";
  const identity = (
    <div className="mb-5 flex min-w-0 items-center gap-3 rounded-md border bg-surface p-3">
      <Store aria-hidden className="size-4 shrink-0 text-secondary-text" />
      <div className="min-w-0">
        <p className="truncate text-sm font-medium" title={restaurantName}>{restaurantName}</p>
        <p className="mt-0.5 text-xs capitalize text-secondary-text">{role}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen md:flex">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col overflow-y-auto border-r bg-sidebar px-3 py-5 md:flex">
        <Link href="/dashboard" className="mb-7 px-3 text-sm font-semibold tracking-[0.16em] focus-visible:outline-2 focus-visible:outline-ring">THALIQ</Link>
        {identity}
        <SidebarNav />
        <div className="mt-auto border-t pt-4">{signOut}</div>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b bg-background px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="size-11 md:hidden" aria-label="Open dashboard navigation"><Menu aria-hidden /></Button>
              </DialogTrigger>
              <DialogContent className="top-0 left-0 h-dvh max-h-dvh w-[min(20rem,calc(100%-2rem))] max-w-none translate-x-0 translate-y-0 rounded-none border-y-0 border-l-0 bg-sidebar p-5 sm:max-w-none">
                <div className="flex min-h-full flex-col">
                  <DialogTitle className="mb-1 pr-10 text-sm tracking-[0.16em]">THALIQ</DialogTitle>
                  <DialogDescription className="mb-6">Restaurant workspace</DialogDescription>
                  {identity}
                  <SidebarNav onNavigate={() => setOpen(false)} />
                  <div className="mt-auto border-t pt-4">{signOut}</div>
                </div>
              </DialogContent>
            </Dialog>
            <span className="truncate text-sm font-medium">{title}</span>
          </div>
          <AppearanceToggle />
        </header>
        <main id="dashboard-content" className="mx-auto w-full min-w-0 max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

export function SignOutLabel() {
  return <><LogOut aria-hidden className="size-4" />Sign out</>;
}
