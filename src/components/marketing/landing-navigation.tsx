"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { AppearanceToggle } from "@/components/dashboard/appearance-toggle";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function LandingNavigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 border-b bg-background">
      <div className="mx-auto flex h-16 max-w-workspace items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" aria-label="QR.CR home" className="text-lg font-semibold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-ring">QR.CR</Link>
        <div className="flex items-center gap-2">
          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
            <Button asChild variant="ghost"><a href="#how-it-works">How It Works</a></Button>
            <Button asChild variant="ghost"><a href="#pricing">Pricing</a></Button>
            <Button asChild variant="ghost"><Link href="/demo">Try Demo</Link></Button>
            <Button asChild variant="ghost"><Link href="/login">Sign In</Link></Button>
            <Button asChild><Link href="/signup">Get Started</Link></Button>
          </nav>
          <AppearanceToggle />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button variant="ghost" size="icon" className="size-11 lg:hidden" aria-label="Open website navigation"><Menu aria-hidden /></Button></DialogTrigger>
            <DialogContent className="gap-5">
              <DialogTitle>QR.CR</DialogTitle>
              <DialogDescription>Restaurant ordering, connected.</DialogDescription>
              <nav aria-label="Mobile website navigation" className="flex flex-col gap-2">
                <Button asChild variant="ghost" className="min-h-11 justify-start"><a href="#how-it-works" onClick={() => setOpen(false)}>How It Works</a></Button>
                <Button asChild variant="ghost" className="min-h-11 justify-start"><a href="#pricing" onClick={() => setOpen(false)}>Pricing</a></Button>
                <Button asChild variant="ghost" className="min-h-11 justify-start"><Link href="/demo" onClick={() => setOpen(false)}>Try Demo</Link></Button>
                <Button asChild variant="ghost" className="min-h-11 justify-start"><Link href="/login" onClick={() => setOpen(false)}>Sign In</Link></Button>
                <Button asChild className="min-h-11"><Link href="/signup" onClick={() => setOpen(false)}>Get Started</Link></Button>
                <Button asChild variant="link" className="min-h-11"><Link href="/staff" onClick={() => setOpen(false)}>Staff Sign In</Link></Button>
              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
