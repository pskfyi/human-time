import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.165.0/testing/asserts.ts";
import { Duration } from "./class.ts";
import {
  createDurationLike,
  durationLikeToString,
  durationLikeToUnit,
  formatDurationLike,
  isDurationLike,
  isDurationString,
  roundDurationLike,
  standardizeDurationLike,
} from "./functions.ts";

import { DurationLike } from "./types.ts";

const DURATION_MAP: Record<string, DurationLike> = {
  "8ms": { milliseconds: 8 },
  "2s": { seconds: 2 },
  "5m": { minutes: 5 },
  "7h": { hours: 7 },
  "3d": { days: 3 },
  "6w": { weeks: 6 },
  "4mo": { months: 4 },
  "9y": { years: 9 },
  "2h10m": { hours: 2, minutes: 10 },
  "3y4d": { years: 3, days: 4 },
  "1y2mo3w4d5h6m7s8ms": {
    years: 1,
    months: 2,
    weeks: 3,
    days: 4,
    hours: 5,
    minutes: 6,
    seconds: 7,
    milliseconds: 8,
  },
};

const DURATION_STRINGS = Object.keys(DURATION_MAP);
const DURATION_LIKES = Object.values(DURATION_MAP);

const DURATION_MS_MAP = new Map<DurationLike, number>([
  [{ seconds: 1 }, 1000],
  [{ minutes: 1 }, 60000],
  [{ hours: 1 }, 3600000],
  [{ days: 1 }, 86400000],
  [{ weeks: 1 }, 604800000],
  [{ months: 1 }, 2592000000],
  [{ years: 1 }, 31536000000],
]);

Deno.test("functions", async (t) => {
  await t.step("isDurationLike", () => {
    assert(!isDurationLike({}));
    assert(!isDurationLike({ seconds: "7" }));
    assert(!isDurationLike({ x: "y" }));

    // May not want to allow this, but it would make the code worse to fail in this case
    assert(isDurationLike({ hours: 1, x: "y" }));

    DURATION_LIKES.forEach((obj) => {
      assert(isDurationLike(obj));
    });
  });

  await t.step("isDurationString", () => {
    assert(!isDurationString(""));
    assert(!isDurationString("HELLO"));
    assert(!isDurationString(" 7h"));

    DURATION_STRINGS.forEach((str) => {
      assert(isDurationString(str));
    });
  });

  await t.step("createDurationLike", () => {
    assertEquals(createDurationLike(10), { minutes: 10 });

    DURATION_LIKES.forEach((obj) => {
      assertEquals(createDurationLike(obj), obj);
    });

    Object.entries(DURATION_MAP).forEach(([str, obj]) => {
      assertEquals(createDurationLike(str), obj);
    });
  });

  await t.step("durationLikeToUnit", () => {
    assertEquals(durationLikeToUnit({ hours: 36 }, "days"), 1.5);
    assertEquals(durationLikeToUnit({ days: 7 }, "weeks"), 1);
    assertEquals(durationLikeToUnit({ minutes: 1 }, "seconds"), 60);
    assertEquals(
      durationLikeToUnit(
        { years: 1, months: 2, weeks: 3, days: 4 },
        "milliseconds",
      ),
      38880000000,
    );

    DURATION_MS_MAP.forEach((ms, obj) => {
      assertEquals(durationLikeToUnit(obj, "milliseconds"), ms);
    });
  });

  await t.step("durationLikeToString", () => {
    // confirming that order in the string is high-to-low regardless of
    // object key order
    assertEquals(durationLikeToString({ hours: 2, years: 1 }), "1y2h");

    Object.entries(DURATION_MAP).forEach(([str, obj]) => {
      assertEquals(durationLikeToString(obj), str);
    });
  });

  await t.step("formatDurationLike", () => {
    assertEquals(
      formatDurationLike({ hours: 1 }, ["minutes"]),
      { minutes: 60 },
    );
    assertEquals(
      formatDurationLike({ minutes: 1 }, ["seconds", "milliseconds"]),
      { seconds: 60, milliseconds: 0 },
    );
  });

  await t.step("standardizeDurationLike", () => {
    assertEquals(
      standardizeDurationLike({ minutes: 90 }),
      { hours: 1, minutes: 30 },
    );
    assertEquals(
      standardizeDurationLike({ hours: 1.5 }),
      { hours: 1, minutes: 30 },
    );
  });

  await t.step("roundDurationLike", () => {
    // Default options: "nearest" strategy
    assertEquals(
      roundDurationLike({ minutes: 40 }, "15m"),
      { minutes: 45 },
    );

    // Strategies
    assertEquals(
      roundDurationLike({ minutes: 40 }, "15m", "down"),
      { minutes: 30 },
    );
    assertEquals(
      roundDurationLike({ hours: 5 }, "3h", "nearest"),
      { hours: 6 },
    );
    assertEquals(
      roundDurationLike({ minutes: 40 }, "15m", "nearest"),
      { minutes: 45 },
    );
    assertEquals(
      roundDurationLike({ minutes: 31 }, "15m", "up"),
      { minutes: 45 },
    );

    // Years/Months/Days
    // Noting that this odd behavior is actually expected.
    // 1yr is 365d but 1mo is only 30d, so when rounding 1yr to the nearest
    // 1mo we get less than 1yr. These sorts of mismatches cascade to affect
    // weeks as well.
    assertEquals(
      roundDurationLike(new Duration("1y2mo3w4d5h6m7s8ms").toJSON(), "1mo"),
      { years: 1, months: 2, weeks: 3, days: 4 },
    );
  });
});

Deno.test("Duration class", async (t) => {
  await t.step("new Duration()", () => {
    new Duration(10);
    new Duration("10m");
    new Duration({ minutes: 10 });
  });

  await t.step("Duration units", () => {
    const duration = new Duration("1y2mo3w4d5h6m7s8ms");
    assertEquals(duration.years, 1);
    assertEquals(duration.months, 2);
    assertEquals(duration.weeks, 3);
    assertEquals(duration.days, 4);
    assertEquals(duration.hours, 5);
    assertEquals(duration.minutes, 6);
    assertEquals(duration.seconds, 7);
    assertEquals(duration.milliseconds, 8);
  });

  await t.step("Duration.standardized", () => {
    const duration = new Duration("1y2mo3w4d5h6m7s8ms");
    assertEquals(duration.standardized, {
      years: 1,
      months: 2,
      weeks: 3,
      days: 4,
      hours: 5,
      minutes: 6,
      seconds: 7,
      milliseconds: 8,
    });
  });

  await t.step("Duration.toString()", () => {
    const duration = new Duration("1y2mo3w4d5h6m7s8ms");

    assertEquals(String(duration), "1y2mo3w4d5h6m7s8ms");
    assertEquals(duration.toString(), "1y2mo3w4d5h6m7s8ms");
    assertEquals(duration.toString({ units: ["weeks"] }), "64w");
    assertEquals(
      duration.toString({ units: ["years", "months"] }),
      "1y2mo",
    );
    assertEquals(
      duration.toString({
        units: ["years", "months"],
        round: ["nearest", "1y"],
      }),
      "1y0mo",
    );
  });

  await t.step("Duration.toJSON()", () => {
    const duration = new Duration("24h");
    assertEquals(JSON.stringify(duration), `{"days":1}`);
    assertEquals(duration.toJSON(), { days: 1 });
    assertEquals(duration.toJSON({ units: ["hours"] }), { hours: 24 });
  });

  await t.step("Duration.toUnit()", () => {
    const duration = new Duration("24h");
    assertEquals(duration.toUnit("days"), 1);
    assertEquals(duration.toUnit("hours"), 24);
  });
});
