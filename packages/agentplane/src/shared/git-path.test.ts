import { describe, expect, it } from "vitest";

import {
  gitPathIsUnderPrefix,
  gitPathPrefixIsUnderPrefix,
  normalizeGitPathCandidate,
  normalizeGitPathPrefix,
} from "./git-path.js";

describe("Git path boundary semantics", () => {
  it("keeps observed POSIX backslashes literal", () => {
    expect(normalizeGitPathCandidate(String.raw`context\escape.md`)).toBe(
      String.raw`context\escape.md`,
    );
    expect(gitPathIsUnderPrefix(String.raw`context\escape.md`, "context")).toBe(false);
    expect(gitPathIsUnderPrefix(String.raw`src\escape`, "src")).toBe(false);
  });

  it("still accepts Windows-style policy prefixes and compacts prefix against prefix", () => {
    expect(normalizeGitPathPrefix(String.raw`src\nested`)).toBe("src/nested");
    expect(gitPathPrefixIsUnderPrefix(String.raw`src\nested`, "src")).toBe(true);
    expect(gitPathIsUnderPrefix("src/nested/file.ts", String.raw`src\nested`)).toBe(true);
  });
});
