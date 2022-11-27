import {
  Duration,
} from "https://raw.githubusercontent.com/pskfyi/human-time/v0.1.0/mod.ts";

console.log(
  new Duration({ days: 7 })
    .toString({ units: ["weeks"] }), // "1w"
);
