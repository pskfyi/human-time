import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.173.0/testing/asserts.ts";
import {
  createDayLike,
  createDayString,
  Day,
  DayLike,
  DayString,
  dayStringToDayLike,
} from "./mod.ts";

Deno.test("Day functions", async ({ step }) => {
  await step("createDayString()", () => {
    const expected: DayString = "2000-1-1";
    const dayLike: DayLike = { year: 2000, month: 1, day: 1 };
    const day = new Day(dayLike);
    const date = new Date(expected);

    assertEquals(createDayString(expected), expected);
    assertEquals(createDayString(dayLike), expected);
    assertEquals(createDayString(day), expected);
    assertEquals(createDayString(date), expected);
  });

  await step("dayStringToDayLike()", () => {
    const input: DayString = "2000-1-1";
    const expected: DayLike = { year: 2000, month: 1, day: 1 };

    assertEquals(dayStringToDayLike(input), expected);
  });

  await step("createDayLike()", () => {
    const expected: DayLike = { year: 2000, month: 1, day: 1 };
    const dayString: DayString = "2000-1-1";
    const day = new Day(dayString);
    const date = new Date(dayString);

    assertEquals(createDayLike(expected), expected);
    assertEquals(createDayLike(dayString), expected);
    assertEquals(createDayLike(day), expected);
    assertEquals(createDayLike(date), expected);
  });
});

Deno.test("Day class", async ({ step }) => {
  await step("new Day()", () => {
    const d1 = new Day("2023-01-21");
    new Day();
    new Day({ year: 2020, month: 5, day: 19 });
    new Day(d1);
    new Day(new Date());
  });

  await step("Day.prototype.toJSON()", () => {
    const str = "2023-01-21";
    assertEquals(new Day(str).toJSON(), `"${str}"`);
  });

  await step("Day.prototype.toString()", () => {
    const str = "2023-01-21";
    assertEquals(new Day(str).toString(), str);
  });

  await step("Day.prototype.toDate()", () => {
    const str = "2023-01-21";
    assert(new Day(str).toDate() instanceof Date);
  });

  await step("Day.today()", () => {
    const todayDate = new Date();
    const todayDay = Day.today();
    assertEquals(todayDay.year, todayDate.getFullYear());
    assertEquals(todayDay.month, todayDate.getMonth() + 1);
    assertEquals(todayDay.day, todayDate.getDate());
  });
});
