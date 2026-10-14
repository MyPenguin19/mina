"use client";

import { useActionState } from "react";

import { addTable } from "@/app/actions/tables";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function AddTableForm({ branches }: { branches: { id: string; name: string }[] }) {
  const [state, formAction, isPending] = useActionState(addTable, { error: null });

  return (
    <form action={formAction} className="grid items-end gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="flex min-w-0 flex-col gap-1.5">
        <Label htmlFor="branchId">Branch</Label>
        <Select
          id="branchId"
          name="branchId"
          required

        >
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))}
        </Select>
      </div>
      <div className="flex min-w-0 flex-col gap-1.5">
        <Label htmlFor="label">Table label</Label>
        <Input id="label" name="label" placeholder="Table 05" required className="w-full" />
      </div>
      <Button type="submit" disabled={isPending} className="w-full sm:w-fit">
        {isPending ? "Adding…" : "Add table"}
      </Button>
      {state.error ? <p className="text-sm text-destructive sm:col-span-2 lg:col-span-3">{state.error}</p> : null}
    </form>
  );
}
