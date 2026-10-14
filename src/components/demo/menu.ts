export const DEMO_MENU = [
  { id: "espresso", name: "Espresso", category: "Coffee", description: "A rich double shot.", priceCents: 300 },
  { id: "cappuccino", name: "Cappuccino", category: "Coffee", description: "Espresso, steamed milk and soft foam.", priceCents: 450 },
  { id: "latte", name: "Iced Latte", category: "Coffee", description: "Chilled espresso with milk over ice.", priceCents: 500 },
  { id: "tea", name: "Fresh Mint Tea", category: "Drinks", description: "A light, refreshing herbal tea.", priceCents: 350 },
  { id: "lemonade", name: "Lemonade", category: "Drinks", description: "Fresh lemon, sparkling water and a little sweetness.", priceCents: 400 },
  { id: "croissant", name: "Croissant", category: "Breakfast", description: "A warm, flaky butter croissant.", priceCents: 350 },
  { id: "toast", name: "Avocado Toast", category: "Breakfast", description: "Sourdough, avocado and lemon.", priceCents: 850 },
  { id: "granola", name: "Yogurt & Granola", category: "Breakfast", description: "Yogurt, granola and seasonal berries.", priceCents: 650 },
  { id: "burger", name: "Burger", category: "Food", description: "A café burger with lettuce and tomato.", priceCents: 1150 },
  { id: "sandwich", name: "Grilled Cheese", category: "Food", description: "Golden sourdough and melted cheddar.", priceCents: 750 },
] as const;

export type DemoItem = (typeof DEMO_MENU)[number];
export type DemoLine = { item: DemoItem; quantity: number };
export const demoTotal = (lines: DemoLine[]) => lines.reduce((sum, line) => sum + line.item.priceCents * line.quantity, 0);
export const demoMoney = (cents: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
