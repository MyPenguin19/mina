"use client";

import { useActionState, useState } from "react";

import { addMenuItem } from "@/app/actions/menu";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function AddItemForm({
  categories,
  restaurantId,
}: {
  categories: { id: string; name: string }[];
  restaurantId: string;
}) {
  const [state, formAction, isPending] = useActionState(addMenuItem, { error: null });
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Clear the picked image once the item has been saved, so the next item
  // doesn't silently reuse the previous photo. Adjusting state during render
  // (rather than in an effect) is React's recommended way to react to a
  // changed prop/action result — it re-renders before committing, with no
  // extra paint.
  const [lastSavedAt, setLastSavedAt] = useState(state.savedAt);
  if (state.savedAt !== lastSavedAt) {
    setLastSavedAt(state.savedAt);
    setImageUrl(null);
  }

  return (
    <form action={formAction} className="grid items-end gap-4 sm:grid-cols-2">
      <input type="hidden" name="imageUrl" value={imageUrl ?? ""} />
      <div className="flex min-w-0 flex-col gap-1.5 sm:col-span-2">
        <Label>Photo</Label>
        <ImageUpload
          bucket="menu-images"
          restaurantId={restaurantId}
          value={imageUrl}
          onChange={setImageUrl}
          prefix="item"
          label="Add photo"
        />
      </div>
      <div className="flex min-w-0 flex-col gap-1.5">
        <Label htmlFor="categoryId">Category</Label>
        <Select
          id="categoryId"
          name="categoryId"
          required

        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </div>
      <div className="flex min-w-0 flex-col gap-1.5">
        <Label htmlFor="itemName">Item name</Label>
        <Input id="itemName" name="name" placeholder="Cappuccino" required className="w-full" />
      </div>
      <div className="flex min-w-0 flex-col gap-1.5">
        <Label htmlFor="basePrice">Price (₹)</Label>
        <Input
          id="basePrice"
          name="basePrice"
          type="number"
          min="0"
          step="0.01"
          placeholder="149"
          required
          className="w-full"
        />
      </div>
      <label className="flex items-center gap-2 pb-2 text-sm">
        <input type="checkbox" name="isVeg" defaultChecked className="size-4" />
        Veg
      </label>
      <Button type="submit" disabled={isPending} className="w-full sm:w-fit">
        {isPending ? "Adding…" : "Add item"}
      </Button>
      {state.error ? <p className="text-sm text-destructive sm:col-span-2">{state.error}</p> : null}
    </form>
  );
}
