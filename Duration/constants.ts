export const DURATION_UNIT_MAP = {
  "years": "y",
  "months": "mo",
  "weeks": "w",
  "days": "d",
  "hours": "h",
  "minutes": "m",
  "seconds": "s",
  "milliseconds": "ms",
} as const;

export const DURATION_UNITS = Object.keys(
  DURATION_UNIT_MAP,
) as Array<keyof typeof DURATION_UNIT_MAP>;

/** @example "3y2h15m" */
export const DURATION_REGEXP = new RegExp(
  "^" + Object.values(DURATION_UNIT_MAP)
    .map((L) => `(?:(\\d+)${L})?`)
    .join("") +
    "$",
);

const S_TO_MS = 1000;
const M_TO_S = 60;
const H_TO_M = 60;
const D_TO_H = 24;
const W_TO_D = 7;
const MO_TO_D = 30;
const Y_TO_D = 365;

const M_TO_MS = M_TO_S * S_TO_MS;
const H_TO_MS = H_TO_M * M_TO_MS;
const D_TO_MS = D_TO_H * H_TO_MS;
const W_TO_MS = W_TO_D * D_TO_MS;
const MO_TO_MS = MO_TO_D * D_TO_MS;
const Y_TO_MS = Y_TO_D * D_TO_MS;

/** A multiplier for converting larger units to milliseconds. */
export const TO_MS = {
  "milliseconds": 1,
  "seconds": S_TO_MS,
  "minutes": M_TO_MS,
  "hours": H_TO_MS,
  "days": D_TO_MS,
  "weeks": W_TO_MS,
  "months": MO_TO_MS,
  "years": Y_TO_MS,
};
