# Organization

This library is organized by topic into directories, with each directory
containing a suite of interconnected files related to that topic.

```
- SomeTopic /
 |- constants.ts
 |- types.ts
 |- functions.ts (or /functions/ with separate files)
 |- class.ts
 |- mod.ts
 |- mod.test.ts
 |- readme.md
```

## Constants File

`constants.ts` exports relevant constants.

## Types File

`types.ts` exports TS typedefs related to the topic. Some types are derived from
constants.

## Functions File or Directory

Functions related to the topic are either collected in a `functions.ts` file, or
broken up into individual files if the single file becomes too unwieldy.

## Class File

The functions and constants are reorganized into a class within `class.ts`. For
FP and tree shaking, individual imports are always preferable, but in contexts
where these concerns are less significant it is often helpful to be able to
leverage class APIs in a manner similar to builtin constructors like `Object`
and `Date`.

## Module File

The Deno convention, following Rust, is to have a `mod.ts` file as a primary
public interface with a directory. The analogue from the Node.js world would be
`index.js` files.

## Test File

All tests for a topic are centralized in a `mod.test.ts` file. This results in a
smaller number of larger test files, compartmentalizing tests and de-cluttering
file browsers while also improving discoverability when refactoring within
modules.

## Readme File

Each topic has its own readme for self-contained notes and examples.
