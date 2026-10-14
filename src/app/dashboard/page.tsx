import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { requireCurrentRestaurant } from "@/lib/restaurant";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardOverviewPage() {
  const restaurant = await requireCurrentRestaurant();
  const supabase = await createClient();

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [{ count: pendingOrders }, { count: activeTables }, { data: todayOrders }, { data: recentOrders }] =
    await Promise.all([
      supabase
        .from("orders")
        .select("id", { count: "exact", head: true })
        .eq("restaurant_id", restaurant.restaurantId)
        .in("status", ["pending", "accepted", "preparing"]),
      supabase
        .from("restaurant_tables")
        .select("id, branches!inner(restaurant_id)", { count: "exact", head: true })
        .eq("branches.restaurant_id", restaurant.restaurantId)
        .neq("status", "available"),
      supabase
        .from("orders")
        .select("total_amount, status")
        .eq("restaurant_id", restaurant.restaurantId)
        .gte("created_at", todayStart.toISOString()),
      supabase
        .from("orders")
        .select("id, order_number, status, total_amount, order_items(item_name, quantity)")
        .eq("restaurant_id", restaurant.restaurantId)
        .order("created_at", { ascending: false })
        .limit(8),
    ]);

  const todayRevenue = (todayOrders ?? [])
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total_amount, 0);

  const stats = [
    { label: "Today's Orders", value: todayOrders?.length ?? 0 },
    { label: "Pending Orders", value: pendingOrders ?? 0 },
    { label: "Active Tables", value: activeTables ?? 0 },
    { label: "Today's Revenue", value: `₹${todayRevenue}` },
  ];

  return <DashboardOverview stats={stats} recentOrders={recentOrders ?? []} restaurantName={restaurant.restaurantName} />;
}
