import { RoundingStrategy } from "../utils/types.ts";
import {
  createDurationLike,
  durationLikeToString,
  durationLikeToUnit,
  formatDurationLike,
  roundDurationLike,
  standardizeDurationLike,
} from "./functions.ts";
import { DurationLike, DurationUnit } from "./types.ts";

export class Duration implements Record<DurationUnit, number> {
  readonly standardized: DurationLike;

  readonly years: number = 0;
  readonly months: number = 0;
  readonly weeks: number = 0;
  readonly days: number = 0;
  readonly hours: number = 0;
  readonly minutes: number = 0;
  readonly seconds: number = 0;
  readonly milliseconds: number = 0;

  /** @example new Duration(15) // 15 minutes */
  constructor(minutes: number);
  /** @example new Duration({ mins: 15 }) */
  constructor(input: DurationLike);
  /** @example new Duration("15m") */
  constructor(input: string);
  /** @example new Duration(someInput) */
  constructor(input: unknown);
  constructor(input: unknown) {
    this.standardized = standardizeDurationLike(createDurationLike(input));

    const entries = Object.entries(
      this.standardized,
    ) as Array<[DurationUnit, number]>;

    for (const [unit, amount] of entries) {
      this[unit] = amount;
    }
  }

  toString(options: Duration.FormattingOptions = {}): string {
    return durationLikeToString(this.toJSON(options));
  }

  toJSON(options: Duration.FormattingOptions = {}): DurationLike {
    const { units, round } = options;

    let obj = this.standardized;

    if (round !== undefined) {
      const [strategy, to] = round;
      obj = roundDurationLike(obj, to, strategy);
    }

    if (units !== undefined) {
      obj = formatDurationLike(obj, units);
    }

    return obj;
  }

  toUnit(unit: DurationUnit) {
    return durationLikeToUnit(this.standardized, unit);
  }
}

declare namespace Duration {
  export type FormattingOptions = {
    units?: DurationUnit[];
    round?: [RoundingStrategy, DurationLike | string];
  };
}
