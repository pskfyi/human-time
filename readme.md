# Human Time

Simplified time-related types, data structures, and functions for Deno.

This package may be replaced by Temporal APIs and new Intl APIs when they become
available in all environments.

## Example

From [`example.ts`](./example.ts):

```ts
import { Day, Duration } from "https://deno.land/x/human_time@0.2.2/mod.ts";

console.log(`Today is ${new Day()}`);

console.log(
  new Duration({ days: 7 })
    .toString({ units: ["weeks"] }), // "1w"
);
```

## Modules

- [Day](./Day/readme.md)
- [Duration](./Duration/readme.md)

## Local Development

```sh
git clone git@github.com:pskfyi/human-time.git
cd human-time
```

With Deno installed:

```sh
deno run example.ts
deno test . # unit testing
deno lint   # linting
deno fmt    # formatting
```

## About

- [Design](./docs/design.md)
- [Organization](./docs/organization.md)
