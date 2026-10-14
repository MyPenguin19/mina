import { ChefHat } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const ORDERS = [
  { table: "04", items: ["2 × Cappuccino", "1 × Croissant"], status: "Preparing", variant: "secondary" as const, progress: 2 },
  { table: "07", items: ["1 × Burger", "2 × Iced Latte"], status: "New Order", variant: "warning" as const, progress: 1 },
  { table: "02", items: ["2 × Espresso"], status: "Ready", variant: "success" as const, progress: 3 },
];

export function WorkspacePreview() {
  return (
    <figure className="mt-4 w-full max-w-4xl text-left">
      <div className="rounded-xl border bg-muted/40 p-3 sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 px-1">
          <span className="flex items-center gap-2 text-sm font-medium"><ChefHat aria-hidden className="size-4" />Restaurant workspace</span>
          <span className="text-xs text-secondary-text">Demo preview · sample orders</span>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {ORDERS.map(order => <Card key={order.table} className="h-full"><CardContent className="flex h-full flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-sm font-semibold">Table {order.table}</h3><Badge variant={order.variant}>{order.status}</Badge></div>
            <ul className="flex flex-col gap-2 text-secondary-body text-secondary-text">{order.items.map(item=><li key={item}>{item}</li>)}</ul>
            <div className="mt-auto flex gap-1 pt-2" role="img" aria-label={`Kitchen progress: ${order.status}`}>{[1,2,3].map(step=><span key={step} className={`h-1 flex-1 rounded-full ${step<=order.progress?"bg-success":"bg-border"}`} />)}</div>
          </CardContent></Card>)}
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs leading-5 text-secondary-text">Illustrative café orders. No live restaurant or customer data.</figcaption>
    </figure>
  );
}
