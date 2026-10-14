"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";

export function StaffLoginCard({
  loginUrl,
  qrDataUrl,
  restaurantCode,
}: {
  loginUrl: string;
  qrDataUrl: string;
  restaurantCode: string;
}) {
  const [copied, setCopied] = useState<"link" | "code" | null>(null);

  function copy(value: string, which: "link" | "code") {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(which);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  return (
    <div className="flex flex-col items-start gap-4 sm:flex-row">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={qrDataUrl} alt="Staff sign-in QR code" className="size-28 shrink-0 rounded-lg border" />

      <div className="flex w-full min-w-0 flex-1 flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Have each staff member scan this once on their phone, then &ldquo;Add to Home
          screen&rdquo;. The device remembers your restaurant — after that they only tap their
          role and PIN.
        </p>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">Sign-in link</span>
          <div className="flex gap-2">
            <code className="min-w-0 flex-1 break-all rounded-md border bg-muted/50 px-2 py-1.5 text-xs">
              {loginUrl}
            </code>
            <Button type="button" variant="outline" size="sm" className="shrink-0" aria-label="Copy staff sign-in link" onClick={() => copy(loginUrl, "link")}>
              {copied === "link" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">
            Restaurant code (if typing manually)
          </span>
          <div className="flex gap-2">
            <code className="min-w-0 flex-1 break-all rounded-md border bg-muted/50 px-2 py-1.5 text-xs">
              {restaurantCode}
            </code>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="shrink-0"
              aria-label="Copy restaurant code"
              onClick={() => copy(restaurantCode, "code")}
            >
              {copied === "code" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
