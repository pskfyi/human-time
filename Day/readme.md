# Day

A calendar day with no respect to time or timezone, with string representations
derived from ISO dates.

## Types

```ts
import { DayLike, DayString, DayUnit } from "human-time/Day/types.ts";

DayString; // "2023-01-01"
DayUnit; // "year" | "month" | "day" all singular
DayLike; // Record<DayUnit, number>>
```

## Class

```ts
import { Day } from "human-time/Day/class.ts";

new Day(); // today
new Day("2000-01-01"); // from string
new Day({ year: 2000, month: 1, day: 1 }); // from DayLike
new Day(new Date("2000-01-01")); // from Date

const day = new Day("2000-01-01");

day.year; // 2000
day.month; // 1
day.day; // 1

day.toString(); // "2000-01-01"
day.toJSON(); // `"2000-01-01"`
day.toDate(); // Date("2000-01-01Z")

Day.today(); // same as new Day()
```

## Functions

```ts
import {
  createDayLike, // from DayString, DayLike, Day, or native Date
  createDayString, // from DayString, DayLike, Day, or native Date
  dayStringToDayLike,
} from "human-time/Day/functions.ts";
```

## Constants

```ts
import {
  DAY_UNITS, // ["year", "month", "day"]
} from "human-time/Day/constants.ts";
```
