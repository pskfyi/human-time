import { divide } from "../utils/mod.ts";
import type { RoundingStrategy } from "../utils/types.ts";
import {
  DURATION_REGEXP,
  DURATION_UNIT_ABBREVIATIONS,
  DURATION_UNITS,
  TO_MS,
} from "./constants.ts";
import { DurationLike, DurationUnit } from "./types.ts";

type DurationEntries = Array<[DurationUnit, number]>;

function _durationStringToEntries(input: string): DurationEntries {
  const parts = input.match(DURATION_REGEXP)?.slice(1) || [];

  return DURATION_UNITS
    .map((unit, i) => [unit, parts[i]])
    .filter(([_, val]) => val !== undefined)
    .map(([unit, val]) => [unit, Number(val)]) as DurationEntries;
}

function _durationLikeFromString(input: string): DurationLike {
  const entries = _durationStringToEntries(input);

  if (!entries.length) {
    throw new Error(`"${input}" is not a valid duration string.`);
  }

  return Object.fromEntries(entries) as DurationLike;
}

function _durationLikeToMilliseconds(input: DurationLike): number {
  const entries = Object.entries(input) as DurationEntries;

  return entries.reduce(
    (total, [unit, amount]) => total + (amount * TO_MS[unit]),
    0,
  );
}

function _durationLikeFromMilliseconds(ms: number): DurationLike {
  if (ms < 1) return { milliseconds: 0 };

  const result: Partial<DurationLike> = {};
  let remainder = Math.round(ms);

  for (const unit of DURATION_UNITS) {
    const [amount, _remainder] = divide(remainder, TO_MS[unit]);

    if (amount < 1) continue;

    remainder = _remainder;
    result[unit] = amount;
  }

  return result as DurationLike;
}

/** @example isDurationString("1h15m") // true */
export function isDurationString(input: string): boolean {
  const entries = _durationStringToEntries(input);

  return Boolean(entries.length);
}

/** @example isDurationLike({ mins: 15 }) // true */
export function isDurationLike(
  input: Record<string, unknown>,
): input is DurationLike {
  const values = DURATION_UNITS
    .map((unit) => input[unit])
    .filter((val) => val !== undefined);

  return values.length > 0 &&
    values.every((val) => typeof val === "number");
}

/** @example createDuration(15) // 15 minutes */
export function createDurationLike(minutes: number): DurationLike;
/** @example createDuration("1h15m") */
export function createDurationLike(str: string): DurationLike;
/** @example createDuration({ minutes: 15 }) */
export function createDurationLike(obj: DurationLike): DurationLike;
export function createDurationLike(input: unknown): DurationLike;
export function createDurationLike(input: unknown): DurationLike {
  if (typeof input === "number") {
    return { minutes: input };
  } else if (typeof input === "string") {
    return _durationLikeFromString(input);
  } else if (
    typeof input === "object" &&
    input !== null &&
    isDurationLike(input as Record<string, unknown>)
  ) {
    return input as DurationLike;
  } else {
    throw new Error("Could not convert arguments to a Duration");
  }
}

/** @example durationLikeToUnit({ seconds: 1 }) // 1000 */
export function durationLikeToUnit(
  input: DurationLike,
  unit: DurationUnit,
): number {
  return _durationLikeToMilliseconds(input) / TO_MS[unit];
}

/** @example durationLikeToString({ hours: 2 }) // "2h" */
export function durationLikeToString(input: DurationLike): string {
  let result = "";

  for (const unit of DURATION_UNITS) {
    const amount = input[unit];
    if (amount === undefined) continue;

    const U = DURATION_UNIT_ABBREVIATIONS[unit];

    result += `${amount}${U}`;
  }

  return result;
}

/**
 * @example
 * formatDurationLike({ hours: 1 }, "minutes") // { minutes: 60 }
 * formatDurationLike(
 *   { hours: 1.5 },
 *   ["hours", "minutes", "seconds"]
 * ) // { hours: 1, minutes: 30, seconds: 0 }
 */
export function formatDurationLike(
  input: DurationLike,
  units: DurationUnit[],
): DurationLike {
  if (!units.length) {
    throw new Error("Invalid units: " + JSON.stringify(units));
  }

  const result: Partial<DurationLike> = {};
  let remainder = Math.round(_durationLikeToMilliseconds(input));

  for (const unit of DURATION_UNITS) {
    if (!units.includes(unit)) continue;

    const [amount, _remainder] = divide(remainder, TO_MS[unit]);

    remainder = _remainder;
    result[unit] = amount;
  }

  return result as DurationLike;
}

/**
 * @example
 * standardizeDurationLike({ minutes: 90 }) // { hours: 1, minutes: 30 }
 * standardizeDurationLike({ hours: 1.5 }) // { hours: 1, minutes: 30 }
 */
export function standardizeDurationLike(input: DurationLike): DurationLike {
  return _durationLikeFromMilliseconds(_durationLikeToMilliseconds(input));
}

/**
 * @example
 * roundDurationLike({ minutes: 20 }, "15m") // { minutes: 15 }
 * roundDurationLike({ minutes: 20 }, "30m") // { minutes: 30 }
 */
export function roundDurationLike(
  input: DurationLike,
  to: string | DurationLike,
  strategy: RoundingStrategy = "nearest",
): DurationLike {
  const toObj: DurationLike = typeof to === "string"
    ? _durationLikeFromString(to)
    : to;

  const inputMS = _durationLikeToMilliseconds(input);
  const toMS = _durationLikeToMilliseconds(toObj);

  let newMS = 0;
  const cap = (inputMS - toMS) || 0;
  while (newMS < cap) {
    newMS += toMS;
  }

  if (strategy === "up") {
    newMS += toMS;
  } else if (strategy === "nearest") {
    const remainder = inputMS - newMS;
    const shouldRoundUp = Boolean(Math.round(remainder / toMS));
    if (shouldRoundUp) {
      newMS += toMS;
    }
  }

  return _durationLikeFromMilliseconds(newMS);
}
