import {
  Day,
  Duration,
} from "https://raw.githubusercontent.com/pskfyi/human-time/v0.2.0/mod.ts";

console.log(`Today is ${new Day()}`);

console.log(
  new Duration({ days: 7 })
    .toString({ units: ["weeks"] }), // "1w"
);
