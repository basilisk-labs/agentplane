import { describe, expect, it } from "vitest";

import { pathFromStatusLine } from "./git-status-path.js";

describe("pathFromStatusLine", () => {
  it.each([
    [" M docs/releases/0.7.10.md", "docs/releases/0.7.10.md"],
    [' M "docs/releases/Release notes.md"', "docs/releases/Release notes.md"],
    [
      ' M "docs/\\320\\240\\320\\265\\320\\273\\320\\270\\320\\267 0.7.10.md"',
      "docs/Релиз 0.7.10.md",
    ],
    ['R  "docs/old name.md" -> "docs/new name.md"', "docs/new name.md"],
    ['R  "docs/old -> name.md" -> "docs/new -> name.md"', "docs/new -> name.md"],
    [' M "docs/tab\\tname.md"', "docs/tab\tname.md"],
    [' M "docs/quote\\"name.md"', 'docs/quote"name.md'],
    [' M "docs/windows\\\\name.md"', "docs/windows/name.md"],
  ])("parses %s", (line, expected) => {
    expect(pathFromStatusLine(line)).toBe(expected);
  });
});
