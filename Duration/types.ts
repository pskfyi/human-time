import { RequireAtLeastOne } from "../utils/types.ts";
import { DURATION_UNIT_ABBREVIATIONS } from "./constants.ts";

export type DurationUnit = keyof typeof DURATION_UNIT_ABBREVIATIONS;

/** @example { minutes: 15 } */
export type DurationLike = RequireAtLeastOne<Record<DurationUnit, number>>;

export type RoundingStrategy = "nearest" | "up" | "down";
