import { DAY_UNITS } from "./constants.ts";

export type DayUnit = typeof DAY_UNITS[number];

/** YYYY-MM-DD. Note that years before 100 will not parse correctly. */
export type DayString = `${number}-${number}-${number}`;

// TODO - add 'satisfies Record<DayUnit, number>' when Deno adds support for it
export type DayLike = {
  /**
   * full year, etc. 1999.
   * Note that years before 100 will not parse correctly.
   */
  year: number;
  /** 1 to 12 */
  month: number;
  /** 1 to 31 */
  day: number;
};
