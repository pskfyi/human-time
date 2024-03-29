import { DAY_REGEXP, DAY_UNITS } from "./constants.ts";
import type { DayLike, DayString } from "./types.ts";

/**
 * Does not validate that the string is a valid day.
 *
 * Does not produce a valid ISO date. Single-digit months and days are not
 * prepended with a zero.
 */
export function createDayString(input: DayString | DayLike | Date): DayString {
  if (typeof input === "string") {
    return input;
  }

  if (input instanceof Date) {
    const year = input.getFullYear();
    const month = input.getMonth() + 1;
    const day = input.getDate();

    return `${year}-${month}-${day}`;
  }

  return `${input.year}-${input.month}-${input.day}`;
}

export function dayStringToDayLike(input: DayString): DayLike {
  const [year, month, day] = input
    .split("-")
    .map(Number);

  return { year, month, day };
}

/** Does not validate that the object is a valid day. */
export function createDayLike(input: DayString | DayLike | Date): DayLike {
  if (typeof input === "string") {
    return dayStringToDayLike(input);
  }

  if (input instanceof Date) {
    const year = input.getFullYear();
    const month = input.getMonth() + 1;
    const day = input.getDate();

    return { year, month, day };
  }

  return { year: input.year, month: input.month, day: input.day };
}

export function isDayLike(input: Record<string, unknown>): input is DayLike {
  const keys = Object.keys(input);

  return keys.length === 3 &&
    DAY_UNITS
      .every((u) => (u in input) && typeof input[u] === "number");
}

export function isDayString(input: string): input is DayString {
  return DAY_REGEXP.test(input);
}
