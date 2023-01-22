/** @returns result and remainder */
export function divide(num: number, den: number): [number, number] {
  return [Math.trunc(num / den), num % den];
}

/**
 * @internal
 *
 * @returns input number, stringified, padded left with zeroes to 2 digits
 */
export function pad(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * @internal
 *
 * Attempts to initialize a `Date` in UTC timezone. A copy of the internal
 * `Date` can be obtained via the `toUTCDate()` method which can be used for
 * string formatting.
 *
 * @throws when the input date string is invalid.
 */
export abstract class UTCDate {
  protected date: Date;

  constructor(str: string) {
    const utcDateObj = new Date(`${str}z`);

    if (isNaN(utcDateObj.valueOf())) {
      throw new Error(`${str}z is not a valid date`);
    }

    this.date = utcDateObj;
  }

  toDate() {
    return new Date(this.date);
  }
}
