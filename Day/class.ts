import { pad, UTCDate } from "../utils/mod.ts";
import { createDayLike, createDayString } from "./functions.ts";
import type { DayLike, DayString } from "./types.ts";

/** Note that years before 100 will not parse correctly. */
export class Day extends UTCDate implements Readonly<DayLike> {
  readonly year: number;
  readonly month: number;
  readonly day: number;

  constructor(input?: DayString | DayLike | Day | Date) {
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
    return `${this}`;
  }

  toObject() {
    return createDayLike(this);
  }

  static today() {
    return new Day();
  }
}
