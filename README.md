# core-world-generator

The base `Generator` class (and `GeneratorRegistry`) which provide a schema to allow world generation in any way so long
as it meets the requirements set out in the interface.

`WorldSize` and `WorldSizeRegistry` hold the world sizes a ruleset offers a new game, each with its grid, its width and
height on that grid, the numbers of civilizations it's offered with and whether there's an Earth map that size, and the
bounds of a size typed in instead (`customLimits()`). A ruleset that registers none leaves the sizes to whatever starts
the game.
