import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, QrCode, ChefHat, Wallet, Table2, Check, Plus } from "lucide-react";
import { LandingNavigation } from "@/components/marketing/landing-navigation";
import { WorkspacePreview } from "@/components/marketing/workspace-preview";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "QR.CR — Scan. Order. Pay.",
  description: "Table QR menus, ordering, live tracking and connected staff workflows in one restaurant workspace.",
};

const STEPS = [
  { title: "Scan", icon: QrCode, description: "Customers scan the QR code assigned to their table. No app download required." },
  { title: "Order", icon: QrCode, description: "Customers browse your menu and place orders directly from their phones." },
  { title: "Prepare", icon: ChefHat, description: "Orders appear in the kitchen, where your team can update their progress." },
  { title: "Pay", icon: Wallet, description: "Customers request their bill and pay using the methods supported by your restaurant." },
];
const FEATURES = [
  { title: "QR Ordering", icon: QrCode, description: "Give every table its own QR code. Customers can browse and order without downloading an app." },
  { title: "Kitchen Management", icon: ChefHat, description: "Keep incoming orders organized and let staff update preparation status." },
  { title: "Tables & Staff", icon: Table2, description: "Manage table visits, staff access, and daily service from one workspace." },
  { title: "Payment Management", icon: Wallet, description: "Track bill requests and record supported payments without replacing your existing POS." },
];
const FAQ = [
  { question: "Do I need to replace my POS?", answer: "No. QR.CR is designed to work alongside your existing restaurant operations. POS synchronization is not currently supported." },
  { question: "Do customers need to download an app?", answer: "No. Customers scan a QR code and use their phone’s browser." },
  { question: "Can multiple customers order from the same table?", answer: "Yes. Multiple devices can participate in the same open table visit." },
  { question: "How does the kitchen receive orders?", answer: "Orders appear in the staff workspace, where kitchen staff can manage preparation." },
  { question: "How do payments work?", answer: "Customers can request their bill. Available methods depend on the restaurant’s configuration. Cashiers record payments; a configured UPI QR lets customers pay in their UPI app. Card processing and automatic payment confirmation are not built in." },
  { question: "Can I cancel my subscription?", answer: "Paid subscriptions are not yet publicly available. Cancellation terms will be provided before billing opens; self-service cancellation is not currently available." },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-surface focus:p-3 focus:ring-2 focus:ring-ring">Skip to content</a>
      <LandingNavigation />
      <main id="main-content" className="mx-auto w-full max-w-workspace px-4 sm:px-6">
        <section aria-labelledby="hero-title" className="flex flex-col items-center gap-6 py-12 text-center sm:py-16">
          <p className="text-xs font-medium uppercase tracking-widest text-secondary-text">QR ordering. One connected team.</p>
          <div className="max-w-3xl">
            <h1 id="hero-title" className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">Scan. Order. Pay.</h1>
            <p className="mt-5 text-xl font-medium leading-8 tracking-tight sm:text-2xl">Simple QR ordering for restaurants and cafés.</p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-secondary-text sm:text-base">Let customers scan, order, and request payment from their phones. Keep your tables, kitchen, and staff connected in one simple workspace.</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button asChild size="lg"><Link href="/signup">Get Started <ArrowRight aria-hidden /></Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/demo">Try Interactive Demo</Link></Button>
          </div>
          <p className="text-xs text-secondary-text">Your menu, tables and team in one workspace.</p>
          <WorkspacePreview />
        </section>

        <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-24 border-t py-10 sm:py-12">
          <p className="text-xs font-medium uppercase tracking-widest text-secondary-text">How it works</p>
          <h2 id="how-title" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">From table to kitchen, without the confusion.</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {STEPS.map(({ title, icon: Icon, description }, index) => (
              <li key={title} className="min-w-0"><Card className="h-full"><CardContent>
                <div className="mb-5 flex items-center justify-between"><Icon aria-hidden className="size-5 text-secondary-text" /><span className="text-xs tabular-nums text-secondary-text">0{index + 1}</span></div>
                <h3 className="text-base font-semibold">{title}</h3><p className="mt-2 text-secondary-body leading-6 text-secondary-text">{description}</p>
              </CardContent></Card></li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="features-title" className="border-t py-10 sm:py-12">
          <h2 id="features-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">The essentials, working together.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-secondary-text">A focused workspace for your menu, tables and the people who make service happen.</p>
          <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {FEATURES.map(({ title, icon: Icon, description }) => (
              <div key={title} className="min-w-0 border-t pt-5"><Icon aria-hidden className="mb-3 size-5 text-secondary-text" /><h3 className="text-sm font-semibold">{title}</h3><p className="mt-2 text-secondary-body leading-6 text-secondary-text">{description}</p></div>
            ))}
          </div>
        </section>

        <section id="pricing" aria-labelledby="pricing-title" className="scroll-mt-24 grid items-start gap-6 border-t py-10 sm:py-12 lg:grid-cols-2">
          <div><p className="text-xs font-medium uppercase tracking-widest text-secondary-text">Pricing</p><h2 id="pricing-title" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Simple pricing. No surprises.</h2><p className="mt-3 max-w-md text-sm leading-6 text-secondary-text">One simple plan for each restaurant location. Join early access while public billing is being prepared.</p></div>
          <Card><CardContent className="flex flex-col gap-5">
            <Badge variant="outline">Early access</Badge><h3 className="text-base font-semibold">QR.CR</h3>
            <div><p className="text-4xl font-semibold tracking-tight tabular-nums">$9.99<span className="ml-1 text-sm font-normal text-secondary-text">/month</span></p><p className="mt-2 text-sm text-secondary-text">Per restaurant location</p></div>
            <ul className="flex flex-col gap-3 text-sm">{["QR menu and table ordering", "Kitchen order management", "Table and visit management", "Staff access", "Payment tracking", "No QR.CR per-order commission", "Restaurant pays applicable payment processing fees"].map(item => <li key={item} className="flex items-start gap-2"><Check aria-hidden className="mt-0.5 size-4 shrink-0 text-success" />{item}</li>)}</ul>
            <p className="border-t pt-4 text-xs leading-5 text-secondary-text">Early-access signup is open. Paid subscriptions are not yet available; the $9.99/location launch offer will be confirmed before billing begins.</p>
            <Button asChild size="lg"><Link href="/signup">Get Started — Early Access</Link></Button>
          </CardContent></Card>
        </section>

        <section aria-labelledby="faq-title" className="border-t py-10 sm:py-12">
          <h2 id="faq-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">A few things you might be wondering.</h2>
          <div className="mt-6 divide-y rounded-xl border bg-surface px-5">
            {FAQ.map(({ question, answer }) => <details key={question} className="group py-4"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-sm text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">{question}<Plus aria-hidden className="size-4 shrink-0 text-secondary-text group-open:rotate-45" /></summary><p className="max-w-3xl pt-2 pb-1 text-secondary-body leading-6 text-secondary-text">{answer}</p></details>)}
          </div>
        </section>

        <section aria-labelledby="cta-title" className="flex flex-col items-center gap-5 border-t py-10 text-center sm:py-12">
          <h2 id="cta-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">Ready to simplify restaurant ordering?</h2>
          <p className="text-sm text-secondary-text">One simple system for your menu, tables, orders, and team.</p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"><Button asChild size="lg"><Link href="/signup">Get Started <ArrowRight aria-hidden /></Link></Button><Button asChild size="lg" variant="outline"><Link href="/demo">Try Interactive Demo</Link></Button></div>
        </section>
      </main>
      <footer className="border-t"><div className="mx-auto flex max-w-workspace flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between"><div><Link href="/" className="text-sm font-semibold">QR.CR</Link><p className="mt-1 text-xs text-secondary-text">Simple QR ordering for restaurants and cafés.</p></div><nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-secondary-body text-secondary-text"><Link href="/login" className="inline-flex min-h-11 items-center hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring">Sign In</Link><Link href="/staff" className="inline-flex min-h-11 items-center hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring">Staff Sign In</Link><a href="#pricing" className="inline-flex min-h-11 items-center hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring">Pricing</a></nav></div></footer>
    </div>
  );
}
