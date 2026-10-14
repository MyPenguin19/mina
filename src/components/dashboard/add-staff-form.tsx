"use client";

import { useActionState } from "react";

import { addStaff } from "@/app/actions/staff";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function AddStaffForm({ branches }: { branches: { id: string; name: string }[] }) {
  const [state, formAction, isPending] = useActionState(addStaff, { error: null });

  return (
    <form action={formAction} className="grid items-end gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div className="flex min-w-0 flex-col gap-1.5">
        <Label htmlFor="staffName">Name</Label>
        <Input id="staffName" name="name" placeholder="Priya" required className="w-full" />
      </div>
      <div className="flex min-w-0 flex-col gap-1.5">
        <Label htmlFor="role">Role</Label>
        <Select
          id="role"
          name="role"
          required

        >
          <option value="waiter">Waiter</option>
          <option value="kitchen">Kitchen</option>
          <option value="cashier">Cashier</option>
        </Select>
      </div>
      <div className="flex min-w-0 flex-col gap-1.5">
        <Label htmlFor="branchId">Branch</Label>
        <Select
          id="branchId"
          name="branchId"

        >
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))}
        </Select>
      </div>
      <div className="flex min-w-0 flex-col gap-1.5">
        <Label htmlFor="pin">PIN</Label>
        <Input
          id="pin"
          name="pin"
          type="password"
          inputMode="numeric"
          placeholder="4 digits"
          pattern="\d{4}"
          minLength={4}
          maxLength={4}
          required
          className="w-full"
        />
      </div>
      <Button type="submit" disabled={isPending} className="w-full sm:w-fit">
        {isPending ? "Adding…" : "Add staff"}
      </Button>
      {state.error ? <p className="text-sm text-destructive sm:col-span-2 xl:col-span-4">{state.error}</p> : null}
    </form>
  );
}
