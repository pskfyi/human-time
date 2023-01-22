# Organization

This library is organized by topic into directories, with each directory
containing a suite of interconnected files related to that topic.

```
- SomeTopic /
 |- class.ts
 |- constants.ts
 |- functions.ts
 |- mod.test.ts
 |- mod.ts
 |- readme.md
 |- types.ts
```

## Class File

For ergonomic reasons related to parity with the `Date` API, this is the primary
export and the focus of the module.

## Constants File

`constants.ts` exports relevant constants.

## Functions File

Functions related to the topic.

## Test File

All tests for a topic are centralized in a `mod.test.ts` file. This results in a
smaller number of larger test files, compartmentalizing tests and de-cluttering
file browsers while also improving discoverability when refactoring within
modules.

## Module File

The Deno convention, following Rust, is to have a `mod.ts` file as a primary
public interface with a directory. The Node.js world analogue is `index.js`.

## Readme File

Each topic has its own readme for self-contained notes and examples.

## Types File

`types.ts` exports TS typedefs related to the topic. Some types are derived from
constants.
