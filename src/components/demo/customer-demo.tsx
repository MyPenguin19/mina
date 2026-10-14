"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Coffee, ShoppingBag, Minus, Plus, Check, RotateCcw } from "lucide-react";
import { AppearanceToggle } from "@/components/dashboard/appearance-toggle";
import { OrderStatusStepper } from "@/components/menu/order-status-stepper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DEMO_MENU, demoMoney, demoTotal, type DemoItem, type DemoLine } from "./menu";

type Stage = "menu" | "tracking" | "bill" | "payment" | "complete";
const CATEGORIES = ["All", "Coffee", "Drinks", "Breakfast", "Food"];
const STATUSES = ["pending", "accepted", "preparing", "ready", "served"] as const;

export function CustomerDemo() {
  const [stage, setStage] = useState<Stage>("menu");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<DemoItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<DemoLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [order, setOrder] = useState<DemoLine[]>([]);
  const [statusIndex, setStatusIndex] = useState(0);
  const [method, setMethod] = useState("Cash");
  const stageHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { if (stage !== "menu") stageHeading.current?.focus(); }, [stage]);
  const count = cart.reduce((sum, line) => sum + line.quantity, 0);
  const total = demoTotal(order);

  function restart() {
    setStage("menu"); setCategory("All"); setSelected(null); setQuantity(1);
    setCart([]); setCartOpen(false); setOrder([]); setStatusIndex(0); setMethod("Cash");
  }
  function addItem() {
    if (!selected) return;
    setCart(lines => {
      const existing = lines.find(line => line.item.id === selected.id);
      return existing ? lines.map(line => line.item.id === selected.id ? { ...line, quantity: line.quantity + quantity } : line) : [...lines, { item: selected, quantity }];
    });
    setSelected(null);
  }
  function updateQuantity(id: string, change: number) {
    setCart(lines => lines.map(line => line.item.id === id ? { ...line, quantity: line.quantity + change } : line).filter(line => line.quantity > 0));
  }
  function submitOrder() {
    if (!cart.length) return;
    setOrder(cart.map(line => ({ ...line }))); setCart([]); setCartOpen(false);
    setStatusIndex(0); setStage("tracking");
  }
  const summary = (
    <div className="flex flex-col gap-3">
      {order.map(line => <div key={line.item.id} className="flex items-start justify-between gap-3 border-b pb-3 text-sm"><span className="min-w-0 break-words">{line.quantity} × {line.item.name}</span><span className="shrink-0 tabular-nums">{demoMoney(line.item.priceCents * line.quantity)}</span></div>)}
      <div className="flex justify-between gap-3 font-semibold"><span>Sample total</span><span className="tabular-nums" data-testid="order-total">{demoMoney(total)}</span></div>
      <p className="text-xs leading-5 text-secondary-text">USD sample prices. No tax or service charge is applied in this demonstration.</p>
    </div>
  );

  return (
    <div className="min-h-screen">
      <header className="border-b"><div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6"><Link href="/" className="text-sm font-semibold">QR.CR</Link><div className="flex items-center gap-1"><Button variant="ghost" size="sm" onClick={restart} className="min-h-11"><RotateCcw aria-hidden />Restart Demo</Button><AppearanceToggle /></div></div></header>
      <main className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6">
        <p className="rounded-lg border bg-muted/40 px-3 py-2 text-xs leading-5 text-secondary-text">Interactive Demo — No real orders or payments</p>
        {stage === "menu" ? <>
          <div className="flex flex-wrap items-start justify-between gap-4"><div><div className="mb-3 flex items-center gap-2"><Coffee aria-hidden className="size-5 text-secondary-text"/><Badge variant="outline">Table 04</Badge></div><h1 ref={stageHeading} tabIndex={-1} className="text-2xl font-semibold tracking-tight">The Corner Café</h1><p className="mt-1 text-secondary-body text-secondary-text">A fictional café. Explore the menu and build your sample order.</p></div>
          <Dialog open={cartOpen} onOpenChange={setCartOpen}><DialogTrigger asChild><Button variant="outline" className="min-h-11" aria-label={`View cart (${count} items)`}><ShoppingBag aria-hidden />View cart · {count}</Button></DialogTrigger><DialogContent><DialogTitle>Your demo cart</DialogTitle><DialogDescription>Adjust your items, then submit a simulated order.</DialogDescription>
            {cart.length ? <div className="flex flex-col gap-4">{cart.map(line => <div key={line.item.id} className="flex flex-col gap-2 border-b pb-3"><div className="flex justify-between gap-3"><span className="font-medium">{line.item.name}</span><span className="shrink-0 tabular-nums">{demoMoney(line.item.priceCents * line.quantity)}</span></div><div className="flex flex-wrap items-center gap-2"><Button variant="outline" size="icon" className="size-11" aria-label={`Decrease ${line.item.name}`} onClick={() => updateQuantity(line.item.id, -1)}><Minus aria-hidden /></Button><span className="min-w-6 text-center tabular-nums" aria-label={`${line.item.name} quantity`}>{line.quantity}</span><Button variant="outline" size="icon" className="size-11" aria-label={`Increase ${line.item.name}`} onClick={() => updateQuantity(line.item.id, 1)}><Plus aria-hidden /></Button><Button variant="ghost" size="sm" className="min-h-11" aria-label={`Remove ${line.item.name}`} onClick={() => setCart(lines => lines.filter(item => item.item.id !== line.item.id))}>Remove</Button></div></div>)}<div className="flex justify-between font-semibold"><span>Sample total</span><span className="tabular-nums" data-testid="cart-total">{demoMoney(demoTotal(cart))}</span></div></div> : <p className="py-4 text-sm text-secondary-text">Your cart is empty. Choose something from the menu.</p>}
            <Button disabled={!cart.length} className="min-h-11" onClick={submitOrder}>Submit simulated order</Button>
          </DialogContent></Dialog></div>
          <div aria-label="Menu categories" className="flex flex-wrap gap-2">{CATEGORIES.map(name => <Button key={name} variant={category===name?"secondary":"ghost"} className="min-h-11" aria-pressed={category===name} onClick={() => setCategory(name)}>{name}</Button>)}</div>
          <div className="grid gap-3 sm:grid-cols-2">{DEMO_MENU.filter(item => category==="All"||item.category===category).map(item => <button key={item.id} type="button" onClick={() => {setSelected(item);setQuantity(1);}} className="flex min-w-0 flex-col gap-3 rounded-xl border bg-surface p-4 text-left transition-colors duration-150 hover:bg-hover focus-visible:outline-2 focus-visible:outline-ring" aria-label={`Choose ${item.name}`}><div className="flex items-start justify-between gap-3"><span className="font-medium">{item.name}</span><span className="shrink-0 tabular-nums">{demoMoney(item.priceCents)}</span></div><span className="text-secondary-body leading-5 text-secondary-text">{item.description}</span><span className="mt-auto text-xs text-secondary-text">{item.category}</span></button>)}</div>
          <Dialog open={!!selected} onOpenChange={open => {if(!open)setSelected(null);}}><DialogContent><DialogTitle>{selected?.name ?? "Choose an item"}</DialogTitle><DialogDescription>{selected?.description}</DialogDescription><div className="flex items-center justify-center gap-4 py-2"><Button variant="outline" size="icon" className="size-11" disabled={quantity===1} aria-label="Decrease quantity" onClick={() => setQuantity(value=>Math.max(1,value-1))}><Minus aria-hidden /></Button><span className="min-w-6 text-center tabular-nums" aria-label="Selected quantity">{quantity}</span><Button variant="outline" size="icon" className="size-11" aria-label="Increase quantity" onClick={() => setQuantity(value=>value+1)}><Plus aria-hidden /></Button></div><Button className="min-h-11" onClick={addItem}>Add to cart · {demoMoney((selected?.priceCents??0)*quantity)}</Button></DialogContent></Dialog>
        </> : stage === "complete" ? <Card><CardContent className="flex flex-col items-center gap-5 py-6 text-center"><Check aria-hidden className="size-8 text-success"/><Badge variant="success">Demonstration complete</Badge><h1 ref={stageHeading} tabIndex={-1} className="text-2xl font-semibold tracking-tight">That&apos;s QR.CR. Simple from start to finish.</h1><p className="max-w-md text-sm leading-6 text-secondary-text">Your customers order from their phones. Your team manages everything in one connected workspace.</p><p className="text-xs text-secondary-text">No order was placed and no payment was taken.</p><div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"><Button asChild className="min-h-11"><Link href="/signup">Get Started</Link></Button><Button variant="outline" className="min-h-11" onClick={restart}>Restart Demo</Button></div></CardContent></Card> : <>
          <div><Badge variant="outline">Table 04</Badge><h1 ref={stageHeading} tabIndex={-1} className="mt-3 text-2xl font-semibold tracking-tight">{stage==="tracking"?"Demo order received":stage==="bill"?"Your sample bill":"Choose a sample payment method"}</h1><p className="mt-2 text-secondary-body text-secondary-text">The Corner Café · simulated order #004</p></div>
          {stage === "tracking" ? <Card><CardContent className="flex flex-col gap-5"><div role="status" aria-live="polite"><OrderStatusStepper status={STATUSES[statusIndex]} /><p className="mt-3 text-center text-sm capitalize" data-testid="demo-status">{STATUSES[statusIndex]}</p></div><p className="text-xs leading-5 text-secondary-text">Advance the sample status to see how an order moves from the kitchen to your table.</p>{statusIndex<STATUSES.length-1 ? <Button className="min-h-11" onClick={() => setStatusIndex(index=>index+1)}>Advance demo status</Button> : <Button className="min-h-11" onClick={() => setStage("bill")}>Request simulated bill</Button>}</CardContent></Card> : null}
          <Card><CardContent>{summary}</CardContent></Card>
          {stage==="bill" ? <Button className="min-h-11" onClick={() => setStage("payment")}>View sample payment options</Button> : null}
          {stage==="payment" ? <Card><CardContent className="flex flex-col gap-5"><p className="text-secondary-body leading-5 text-secondary-text">In the real product, payment options depend on the restaurant. This selection only simulates cashier payment recording; it does not process a payment.</p><div className="grid gap-2 sm:grid-cols-3" aria-label="Sample payment methods">{["Cash","Card","UPI"].map(name=><Button key={name} variant={method===name?"secondary":"outline"} className="min-h-11" aria-pressed={method===name} onClick={() => setMethod(name)}>{name}</Button>)}</div><Button className="min-h-11" onClick={() => setStage("complete")}>Complete simulated payment</Button></CardContent></Card> : null}
        </>}
      </main>
    </div>
  );
}
