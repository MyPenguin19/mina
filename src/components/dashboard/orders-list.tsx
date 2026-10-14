import { StatusBadge } from "@/components/dashboard/status-badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Table, TableCell, TableHead } from "@/components/ui/table";

type Order = {
  id: string;
  order_number: string | number;
  status: string;
  total_amount: number;
  created_at: string;
  branches: { name: string } | null;
};

function createdLabel(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleString("en-US", {
    timeZone: "UTC", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

export function OrdersList({ orders }: { orders: Order[] }) {
  return (
    <Card className="gap-0 overflow-hidden pb-0">
      <CardHeader className="pb-4"><CardTitle className="text-base">Recent orders</CardTitle></CardHeader>
      {orders.length ? (
        <Table className="table-fixed">
          <caption className="sr-only">Recent orders, branch, created time in UTC, total and status</caption>
          <thead><tr>
            <TableHead scope="col" className="w-[56%] sm:w-[55%] lg:w-[65%]">Order</TableHead>
            <TableHead scope="col" className="hidden w-[20%] lg:w-[17%] text-right sm:table-cell">Total</TableHead>
            <TableHead scope="col" className="text-right">Status</TableHead>
          </tr></thead>
          <tbody>{orders.map(order => (
            <tr key={order.id} className="group transition-colors duration-150 hover:bg-hover/40">
              <TableCell>
                <p className="break-words font-medium">Order #{order.order_number}</p>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs leading-5 text-secondary-text">
                  <span className="break-words">{order.branches?.name}</span>
                  <time dateTime={order.created_at}>Created {createdLabel(order.created_at)} UTC</time>
                </div>
                <p className="mt-1 tabular-nums sm:hidden">₹{order.total_amount}</p>
              </TableCell>
              <TableCell className="hidden text-right tabular-nums sm:table-cell">₹{order.total_amount}</TableCell>
              <TableCell className="text-right"><StatusBadge status={order.status} /></TableCell>
            </tr>
          ))}</tbody>
        </Table>
      ) : <EmptyState>No orders yet. Orders placed from the customer QR menu will appear here in real time.</EmptyState>}
    </Card>
  );
}
