import { Inbox } from "lucide-react";

export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 px-5 py-8 text-center">
      <Inbox aria-hidden className="size-6 text-secondary-text" />
      <p className="max-w-sm text-secondary-body text-secondary-text">{children}</p>
    </div>
  );
}
