import { Day, Duration } from "https://deno.land/x/human_time@0.2.2/mod.ts";

console.log(`Today is ${new Day()}`);

console.log(
  new Duration({ days: 7 })
    .toString({ units: ["weeks"] }), // "1w"
);
