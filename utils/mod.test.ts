import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import { divide } from "./mod.ts";

Deno.test("divide", () => {
  assertEquals(divide(1, 1), [1, 0]);
  assertEquals(divide(100, 40), [2, 20]);
  assertEquals(divide(2, 1.5), [1, 0.5]);
});
