/** @returns result and remainder */
export function divide(num: number, den: number): [number, number] {
  return [Math.trunc(num / den), num % den];
}
