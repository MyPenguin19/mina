import { ClipboardList, Clock3, Table2, IndianRupee } from "lucide-react";
import { AutoRefresh } from "@/components/auto-refresh";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Table, TableCell, TableHead } from "@/components/ui/table";

type RecentOrder = {
  id: string;
  order_number: string | number;
  status: string;
  total_amount: number;
  order_items: { item_name: string; quantity: number }[];
};

const ICONS = [ClipboardList, Clock3, Table2, IndianRupee];

function statusVariant(status: string) {
  if (["served", "completed", "ready"].includes(status)) return "success";
  if (status === "cancelled") return "destructive";
  if (status === "pending") return "warning";
  return "info";
}

export function DashboardOverview({ stats, recentOrders, restaurantName }: {
  stats: { label: string; value: string | number }[];
  recentOrders: RecentOrder[];
  restaurantName: string;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-6">
      <AutoRefresh intervalMs={8000} />
      <div>
        <h1 className="text-2xl font-semibold leading-8 tracking-tight">Welcome back</h1>
        <p className="mt-1 break-words text-secondary-body text-secondary-text">{restaurantName} — live overview</p>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = ICONS[index];
          return (
            <Card key={stat.label} className="min-w-0 gap-3 p-5">
              <div className="flex min-h-8 items-center justify-between gap-2">
                <span className="text-xs font-medium leading-4 text-secondary-text">{stat.label}</span>
                {Icon ? <Icon aria-hidden className="size-4 shrink-0 text-secondary-text" /> : null}
              </div>
              <p className="text-metric font-semibold tracking-tight tabular-nums [overflow-wrap:anywhere]">{stat.value}</p>
            </Card>
          );
        })}
      </div>

      <Card className="gap-0 overflow-hidden pb-0">
        <CardHeader className="pb-5">
          <CardTitle className="text-base">Live order feed</CardTitle>
        </CardHeader>
        {recentOrders.length > 0 ? (
          <Table className="table-fixed">
            <caption className="sr-only">Recent orders with items, total and current status</caption>
            <thead>
              <tr>
                <TableHead scope="col" className="w-[56%] sm:w-[55%] lg:w-[65%]">Order</TableHead>
                <TableHead scope="col" className="hidden w-[20%] lg:w-[17%] text-right sm:table-cell">Total</TableHead>
                <TableHead scope="col" className="text-right">Status</TableHead>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="group transition-colors duration-150 hover:bg-hover/40">
                  <TableCell>
                    <p className="break-words font-medium">Order #{order.order_number}</p>
                    <p className="mt-1 break-words text-secondary-body text-secondary-text">{order.order_items.map((i) => `${i.item_name} × ${i.quantity}`).join(", ")}</p>
                    <p className="mt-2 text-sm tabular-nums sm:hidden">₹{order.total_amount}</p>
                  </TableCell>
                  <TableCell className="hidden text-right tabular-nums sm:table-cell">₹{order.total_amount}</TableCell>
                  <TableCell className="text-right"><Badge variant={statusVariant(order.status)} className="min-h-6 max-w-full whitespace-normal break-words capitalize">{order.status}</Badge></TableCell>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <EmptyState>No orders yet. Once customers start scanning table QR codes, live orders will appear here.</EmptyState>
        )}
      </Card>
    </div>
  );
}
