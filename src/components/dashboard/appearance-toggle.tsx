"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "thaliq_appearance";

export function AppearanceToggle() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      let preference: string | null = null;
      try { preference = localStorage.getItem(STORAGE_KEY); } catch { /* Appearance still works without storage. */ }
      document.documentElement.classList.toggle("dark", preference === "dark" || (preference !== "light" && media.matches));
    };
    media.addEventListener("change", sync);
    window.addEventListener("storage", sync);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  function toggle() {
    const dark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", dark);
    try { localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light"); } catch { /* Session-only appearance fallback. */ }
  }

  return (
    <Button type="button" variant="ghost" size="icon" className="size-11" onClick={toggle} aria-label="Switch between light and dark appearance" title="Switch appearance">
      <Moon aria-hidden className="dark:hidden" />
      <Sun aria-hidden className="hidden dark:block" />
    </Button>
  );
}
