import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RestaurantSettingsForm } from "@/components/dashboard/restaurant-settings-form";
import { requireCurrentRestaurant } from "@/lib/restaurant";
import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const restaurant = await requireCurrentRestaurant();
  const supabase = await createClient();

  const { data } = await supabase
    .from("restaurants")
    .select(
      "name, phone, description, tax_percent, service_charge_percent, logo_url, cover_image_url, upi_id, upi_display_name",
    )
    .eq("id", restaurant.restaurantId)
    .single();

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <PageHeader title="Settings">Restaurant profile, tax and service charge.</PageHeader>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profile</CardTitle>
        </CardHeader>
        <CardContent>
          {data ? (
            <RestaurantSettingsForm restaurant={data} restaurantId={restaurant.restaurantId} />
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
