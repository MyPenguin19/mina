import { DashboardShell, SignOutLabel } from "@/components/dashboard/dashboard-shell";
import { Button } from "@/components/ui/button";
import { requireCurrentRestaurant } from "@/lib/restaurant";
import { signOutOwner } from "@/app/actions/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const restaurant = await requireCurrentRestaurant();

  return (
    <DashboardShell
      restaurantName={restaurant.restaurantName}
      role={restaurant.role}
      signOut={
        <form action={signOutOwner}>
          <Button type="submit" variant="ghost" className="min-h-11 w-full justify-start text-secondary-text"><SignOutLabel /></Button>
        </form>
      }
    >
      {children}
    </DashboardShell>
  );
}
