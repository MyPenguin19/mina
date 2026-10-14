import { PageHeader } from "@/components/dashboard/page-header";
import { AddCategoryForm } from "@/components/dashboard/add-category-form";
import { AddItemForm } from "@/components/dashboard/add-item-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireCurrentRestaurant } from "@/lib/restaurant";
import { createClient } from "@/lib/supabase/server";

export default async function MenuPage() {
  const restaurant = await requireCurrentRestaurant();
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("menu_categories")
    .select("id, name, menu_items(id, name, base_price, is_veg, is_available, image_url)")
    .eq("restaurant_id", restaurant.restaurantId)
    .order("sort_order");

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <PageHeader title="Menu">Categories, items and pricing.</PageHeader>

      <div className="grid items-start gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Add a category</CardTitle>
          </CardHeader>
          <CardContent>
            <AddCategoryForm />
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Add an item</CardTitle>
          </CardHeader>
          <CardContent>
            {categories && categories.length > 0 ? (
              <AddItemForm categories={categories} restaurantId={restaurant.restaurantId} />
            ) : (
              <p className="text-sm text-muted-foreground">Create a category first.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        {(categories ?? []).map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle className="text-base">{category.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {category.menu_items.length === 0 && (
                <p className="text-sm text-muted-foreground">No items yet.</p>
              )}
              {category.menu_items.map((item) => (
                <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 border-b py-3 last:border-0">
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    {item.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image_url}
                        alt=""
                        className="size-10 shrink-0 rounded-md border object-cover"
                      />
                    ) : (
                      <div className="size-10 shrink-0 rounded-md border border-dashed" />
                    )}
                    <span
                      className={`size-2.5 shrink-0 rounded-sm border ${item.is_veg ? "border-success bg-success" : "border-destructive bg-destructive"}`}
                    />
                    <span className="min-w-0 flex-1 break-words"><span className="sr-only">{item.is_veg ? "Vegetarian: " : "Non-vegetarian: "}</span>{item.name}</span>
                    {!item.is_available && <Badge variant="destructive">Unavailable</Badge>}
                  </div>
                  <span className="shrink-0 font-medium tabular-nums">₹{item.base_price}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
        {(!categories || categories.length === 0) && (
          <p className="text-sm text-muted-foreground">No categories yet.</p>
        )}
      </div>
    </div>
  );
}
