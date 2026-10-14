import { PageHeader } from "@/components/dashboard/page-header";
import { AutoRefresh } from "@/components/auto-refresh";
import { OrdersList } from "@/components/dashboard/orders-list";
import { requireCurrentRestaurant } from "@/lib/restaurant";
import { createClient } from "@/lib/supabase/server";

export default async function OrdersPage() {
  const restaurant = await requireCurrentRestaurant();
  const supabase = await createClient();

  const { data: orders } = await supabase
    .from("orders")
    .select("id, order_number, status, total_amount, created_at, branches(name)")
    .eq("restaurant_id", restaurant.restaurantId)
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <AutoRefresh intervalMs={5000} />
      <PageHeader title="Orders">Live and recent orders across all branches.</PageHeader>

      <OrdersList orders={(orders ?? []) as unknown as Parameters<typeof OrdersList>[0]["orders"]} />
    </div>
  );
}
