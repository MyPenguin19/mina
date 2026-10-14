import { Badge } from "@/components/ui/badge";

export function StatusBadge({ status }: { status: string }) {
  const variant = ["available", "ready", "served", "completed", "paid"].includes(status)
    ? "success"
    : ["pending", "order_pending", "bill_requested"].includes(status)
      ? "warning"
      : ["cancelled", "failed", "unavailable"].includes(status)
        ? "destructive"
        : "secondary";
  return <Badge variant={variant} className="max-w-full whitespace-normal break-words capitalize">{status.replaceAll("_", " ")}</Badge>;
}
