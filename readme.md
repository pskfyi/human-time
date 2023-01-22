# Human Time

Simplified time-related types, data structures, and functions for Deno.

This package may be replaced by Temporal APIs and new Intl APIs when they become
available in all environments.

## Example

From [`example.ts`](./example.ts):

```ts
import {
  Day,
  Duration,
} from "https://raw.githubusercontent.com/pskfyi/human-time/v0.1.0/mod.ts";

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
