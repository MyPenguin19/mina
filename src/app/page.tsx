import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, QrCode, UtensilsCrossed, ChefHat, Wallet, ClipboardList, Table2, Users, Check, Plus } from "lucide-react";
import { LandingNavigation } from "@/components/marketing/landing-navigation";
import { OrdersList } from "@/components/dashboard/orders-list";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "QR.CR — Scan. Order. Pay.",
  description: "Table QR menus, ordering, live tracking and connected staff workflows in one restaurant workspace.",
};

const STEPS = [
  { title: "Scan", icon: QrCode, description: "Customers scan the QR code assigned to their table. Their table is identified automatically." },
  { title: "Order", icon: UtensilsCrossed, description: "They browse your menu, choose items and submit an order from their browser." },
  { title: "Prepare", icon: ChefHat, description: "Kitchen staff see incoming orders. Waiters see what is ready to serve and respond to table requests." },
  { title: "Pay", icon: Wallet, description: "Customers request their bill and use your supported payment methods. Your cashier records the payment." },
];
const FEATURES = [
  { title: "A QR for every table", icon: QrCode, description: "Generate and download table-specific QR codes. Update your menu without reprinting them." },
  { title: "Your menu, easy to manage", icon: UtensilsCrossed, description: "Organize categories, item photos, prices and availability in one place." },
  { title: "Live order tracking", icon: ClipboardList, description: "Customers follow their order status while your team keeps service moving." },
  { title: "Connected staff workflows", icon: Users, description: "Dedicated kitchen, waiter and cashier screens, with role and PIN sign-in for floor staff." },
  { title: "Tables and visits", icon: Table2, description: "See table status and group orders into the current table visit." },
  { title: "Payment management", icon: Wallet, description: "Record cash, card and UPI payments. Show a UPI payment QR when your restaurant has configured one." },
  { title: "A clear activity overview", icon: ClipboardList, description: "See today’s orders, pending orders, active tables and today’s order revenue. Detailed analytics are not yet available." },
];
const FAQ = [
  { question: "Do I need to replace my POS?", answer: "QR.CR can be used alongside your existing POS for QR ordering and staff coordination. It does not currently synchronize with or integrate into your POS." },
  { question: "Do customers need to download an app?", answer: "No. The table QR opens the menu in their phone’s browser, where they can place an order and track its status." },
  { question: "Can multiple customers order from the same table?", answer: "Yes. Customers can place separate orders using the same table QR. Orders are associated with the table’s current open visit; carts remain separate on each device." },
  { question: "How do restaurant staff receive orders?", answer: "Kitchen, waiter and cashier screens refresh automatically. Kitchen staff manage preparation, waiters see ready orders and table requests, and cashiers manage bills." },
  { question: "How does payment work?", answer: "Customers request their bill from the table menu. Your cashier records cash, card or UPI payments. If a UPI ID is configured, the cashier can show a payment QR for the customer to use in their UPI app. QR.CR does not process cards or confirm payments automatically." },
  { question: "Can I cancel my subscription?", answer: "Self-service subscription cancellation is not currently available. Billing availability, subscription terms and cancellation arrangements must be confirmed before subscribing." },
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
            <p className="mt-5 text-xl font-medium leading-8 tracking-tight sm:text-2xl">Everything your restaurant needs to manage QR ordering, in one simple place.</p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-secondary-text sm:text-base">Let customers scan a table QR code, browse your menu and place orders from their phones. They can request a bill and pay using your restaurant’s supported methods. Keep your kitchen and staff connected alongside your existing POS.</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button asChild size="lg"><Link href="/signup">Start Free Trial <ArrowRight aria-hidden /></Link></Button>
            <Button asChild size="lg" variant="outline"><a href="#how-it-works">See How It Works</a></Button>
          </div>
          <p className="text-xs text-secondary-text">Your menu, tables and team in one workspace.</p>
          <figure className="mt-4 w-full max-w-4xl text-left">
            <div className="rounded-xl border bg-muted/40 p-3 sm:p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2 px-1">
                <span className="text-sm font-medium">One place to keep orders organized</span>
                <span className="text-xs text-secondary-text">Order management preview</span>
              </div>
              <OrdersList orders={[]} />
            </div>
            <figcaption className="mt-3 text-center text-xs leading-5 text-secondary-text">An empty-state preview of your order feed. New orders appear as customers scan and order.</figcaption>
          </figure>
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
          <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ title, icon: Icon, description }) => (
              <div key={title} className="min-w-0 border-t pt-5"><Icon aria-hidden className="mb-3 size-5 text-secondary-text" /><h3 className="text-sm font-semibold">{title}</h3><p className="mt-2 text-secondary-body leading-6 text-secondary-text">{description}</p></div>
            ))}
          </div>
        </section>

        <section id="pricing" aria-labelledby="pricing-title" className="scroll-mt-24 grid items-start gap-6 border-t py-10 sm:py-12 lg:grid-cols-2">
          <div><p className="text-xs font-medium uppercase tracking-widest text-secondary-text">Pricing</p><h2 id="pricing-title" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Simple pricing. No surprises.</h2><p className="mt-3 max-w-md text-sm leading-6 text-secondary-text">A straightforward proposed launch offer for each restaurant location.</p></div>
          <Card><CardContent className="flex flex-col gap-5">
            <Badge variant="outline">Proposed pricing</Badge>
            <div><p className="text-4xl font-semibold tracking-tight tabular-nums">$9.99<span className="ml-1 text-sm font-normal text-secondary-text">/month</span></p><p className="mt-2 text-sm text-secondary-text">Per restaurant location</p></div>
            <ul className="flex flex-col gap-3 text-sm">{["No QR.CR per-order commission", "Restaurant pays its own payment processing fees", "One proposed subscription per location", "Supported QR ordering and management features"].map(item => <li key={item} className="flex items-start gap-2"><Check aria-hidden className="mt-0.5 size-4 shrink-0 text-success" />{item}</li>)}</ul>
            <p className="border-t pt-4 text-xs leading-5 text-secondary-text">Proposed offer, not an available checkout plan. Billing availability, included features and subscription terms are to be confirmed.</p>
            <Button asChild size="lg"><Link href="/signup">Start Free Trial</Link></Button>
          </CardContent></Card>
        </section>

        <section aria-labelledby="faq-title" className="border-t py-10 sm:py-12">
          <h2 id="faq-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">A few things you might be wondering.</h2>
          <div className="mt-6 divide-y rounded-xl border bg-surface px-5">
            {FAQ.map(({ question, answer }) => <details key={question} className="group py-4"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-sm text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">{question}<Plus aria-hidden className="size-4 shrink-0 text-secondary-text group-open:rotate-45" /></summary><p className="max-w-3xl pt-2 pb-1 text-secondary-body leading-6 text-secondary-text">{answer}</p></details>)}
          </div>
        </section>

        <section aria-labelledby="cta-title" className="flex flex-col items-center gap-5 border-t py-10 text-center sm:py-12"><h2 id="cta-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">Ready to simplify restaurant ordering?</h2><Button asChild size="lg"><Link href="/signup">Get Started <ArrowRight aria-hidden /></Link></Button></section>
      </main>
      <footer className="border-t"><div className="mx-auto flex max-w-workspace flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between"><Link href="/" className="text-sm font-semibold">QR.CR</Link><nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-secondary-body text-secondary-text"><Link href="/login" className="inline-flex min-h-11 items-center hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring">Sign In</Link><Link href="/staff" className="inline-flex min-h-11 items-center hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring">Staff Sign In</Link><a href="#pricing" className="inline-flex min-h-11 items-center hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring">Pricing</a></nav></div></footer>
    </div>
  );
}
