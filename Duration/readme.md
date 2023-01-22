# Duration

A length of time, ex. 4 hours.

A Duration has many possible representations for the same underlying data. This
module largely focuses on short, human-readable string formats similar to the
"narrow" format of `Intl.DurationFormat`. An Object Oriented approach is used to
bundle and namespace the representations together.

## Types

```ts
import { DurationLike, DurationUnit } from "human-time/Duration/mod.ts";

DurationUnit; // "years" | "months" | ... all plural
DurationLike; // RequireAtLeastOne<Record<DurationUnit, number>>
```

## Class

The `Duration` class bundles the functions (described below) in ergonomic
wrappers.

```ts
import { Duration } from "human-time/mod.ts";

new Duration(15); // from number of minutes
new Duration("4h21m"); // from strings
new Duration({ hours: 2 }); // from DurationLike objects

const thirtyHours = new Duration("30h");

thirtyHours.days; // 1
thirtyHours.hours; // 6

thirtyHours.to("hours"); // 30
thirtyHours.to("days"); // 1.25

thirtyHours.toString(); // "1d6h"
thirtyHours.toString({ units: ["days"] }); // "1d"
thirtyHours.toString({ round: ["up", "1d"] }); // "2d"
thirtyHours.toString({
  units: ["hours"],
  round: ["down", "1d"],
}); // "24h"

thirtyHours.toJSON(); // { days: 1, hours: 6 }
thirtyHours.toJSON({ units: ["days"] }); // { days: 1 }
thirtyHours.toJSON({ round: ["up", "1d"] }); // { days: 2 }
thirtyHours.toJSON({
  units: ["hours"],
  round: ["down", "1d"],
}); // { hours: 24 }
```

## Functions

```ts
import * as fn from "human-time/Duration/mod.ts";

fn.isDurationLike({ years: 1 }); // true
fn.isDurationString("1y"); // true

fn.createDurationLike("1y"); // { years: 1 }

fn.durationLikeToUnit({ weeks: 1 }, "days"); // 7
fn.durationLikeToString({ weeks: 1 }); // "1w"
fn.formatDurationLike({ weeks: 1 }, ["days"]); // { days: 7 }
fn.standardizeDurationLike({ days: 365 }); // { years: 1 }
fn.roundDurationLike({ hours: 40 }); // { days: 2 }
```
