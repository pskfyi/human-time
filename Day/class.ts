import { pad, UTCDate } from "../utils/mod.ts";
import { createDayString } from "./functions.ts";
import type { DayLike } from "./types.ts";

export type IsoDayString = `${number}-${number}-${number}`;

/** Note that years before 100 will not parse correctly. */
export class Day extends UTCDate implements Readonly<DayLike> {
  readonly year: number;
  readonly month: number;
  readonly day: number;

  constructor(input?: IsoDayString | DayLike | Day | Date) {
    const str = createDayString(input ?? new Date());

    super(str);

    this.year = this.date.getUTCFullYear();
    this.month = this.date.getUTCMonth() + 1;
    this.day = this.date.getUTCDate();
  }

  toString() {
    return `${this.year}-${pad(this.month)}-${pad(this.day)}`;
  }

  toJSON() {
    return `"${this}"`;
  }

  static today() {
    return new Day();
  }
}
