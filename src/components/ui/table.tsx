import * as React from "react";
import { cn } from "@/lib/utils";

export function Table({ className, ...props }: React.ComponentProps<"table">) {
  return <table className={cn("w-full border-collapse text-left text-sm", className)} {...props} />;
}
export function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return <th className={cn("border-y bg-muted/40 px-5 py-3 text-xs font-medium text-secondary-text", className)} {...props} />;
}
export function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return <td className={cn("border-b px-5 py-4 align-middle group-last:border-b-0", className)} {...props} />;
}
