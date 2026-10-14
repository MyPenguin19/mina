import type { Metadata } from "next";
import { CustomerDemo } from "@/components/demo/customer-demo";

export const metadata: Metadata = {
  title: "The Corner Café — QR.CR Interactive Demo",
  description: "Explore a simulated table order. No registration, real orders or payments.",
};

export default function DemoPage() {
  return <CustomerDemo />;
}
