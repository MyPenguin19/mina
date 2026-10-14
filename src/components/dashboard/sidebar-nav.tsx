"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Table2,
  UtensilsCrossed,
  Tag,
  Users,
  BarChart3,
  QrCode,
  Palette,
  Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/orders", label: "Orders", icon: ClipboardList },
  { href: "/dashboard/tables", label: "Tables", icon: Table2 },
  { href: "/dashboard/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/dashboard/offers", label: "Offers", icon: Tag },
  { href: "/dashboard/branding", label: "Branding", icon: Palette },
  { href: "/dashboard/staff", label: "Staff", icon: Users },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/qr", label: "QR Codes", icon: QrCode },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function SidebarNav({ onNavigate }: { onNavigate?: () => void } = {}) {
  const pathname = usePathname();

  return (
    <nav aria-label="Owner dashboard" className="flex flex-col gap-1">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive = href === "/dashboard" ? pathname === href : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex items-center min-h-11 gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "bg-sidebar-active text-foreground"
                : "text-sidebar-foreground hover:bg-hover hover:text-foreground",
            )}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
