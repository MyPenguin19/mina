import { test } from "node:test";
import assert from "node:assert/strict";
import { DEMO_MENU, demoMoney, demoTotal } from "../src/components/demo/menu.ts";

test("sample cart quantities produce exact cent totals", () => {
  const cappuccino = DEMO_MENU.find(item => item.id === "cappuccino");
  const croissant = DEMO_MENU.find(item => item.id === "croissant");
  assert.equal(demoTotal([{ item: cappuccino, quantity: 2 }, { item: croissant, quantity: 1 }]), 1250);
  assert.equal(demoMoney(1250), "$12.50");
  assert.equal(demoTotal([{ item: cappuccino, quantity: 3 }]), 1350);
});

test("empty and removed-item carts have no residual totals", () => {
  assert.equal(demoTotal([]), 0);
  assert.equal(demoMoney(0), "$0.00");
  assert.equal(demoTotal([{ item: DEMO_MENU[0], quantity: 1 }]), 300);
});

test("sample menu has unique identities and integer prices", () => {
  assert.equal(new Set(DEMO_MENU.map(item => item.id)).size, DEMO_MENU.length);
  assert.ok(DEMO_MENU.length >= 8 && DEMO_MENU.length <= 12);
  for (const item of DEMO_MENU) assert.ok(Number.isSafeInteger(item.priceCents) && item.priceCents > 0);
});

test("demo source has no production actions, database clients or network writes", async () => {
  const { readFile } = await import("node:fs/promises");
  for (const file of ["../src/components/demo/customer-demo.tsx", "../src/components/demo/menu.ts", "../src/app/demo/page.tsx"]) {
    const source = await readFile(new URL(file, import.meta.url), "utf8");
    assert.doesNotMatch(source, /@\/app\/actions|@\/lib\/supabase|\bfetch\s*\(|XMLHttpRequest|sendBeacon|stripe/i);
  }
});
