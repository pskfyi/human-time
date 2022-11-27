# Design

## Brevity, Legibility, and Ergonomics

This package is intended to support terse time formats that we're used to typing
or writing by hand in our notes - things like "1h30m" to describe the duration
of a movie. These formats are natural, making them ergonomic and legible while
also being optimally brief. Compare to ISO formats such as "PT1H30M" for the
same duration and you'll see a world of difference.

## Bidirectionality

A core goal of the package is the ability to translate between the
above-described shorthand string formats, and classes or objects.

## Units and Scale

This package is designed to describe timescales relevant to most humans - units
like years, hours, minutes, months, and weeks. It is not intended for scientific
use.

| Unit        | Shorthand |
| :---------- | :-------- |
| Millennium  | -         |
| Century     | -         |
| Decade      | -         |
| Year        | y         |
| Month       | m         |
| Week        | w         |
| Day         | d         |
| Hour        | h         |
| Minute      | m         |
| Second      | s         |
| Millisecond | ms        |
