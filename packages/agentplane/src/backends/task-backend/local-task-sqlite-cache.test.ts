import { describe, expect, it } from "vitest";

import { parseTaskProjectionPorcelainPath } from "./local-task-sqlite-cache.js";

describe("local task SQLite cache", () => {
  it("parses quoted git porcelain task paths before hashing dirty files", () => {
    expect(parseTaskProjectionPorcelainPath(' M ".agentplane/tasks/T-1/notes with space.md"')).toBe(
      ".agentplane/tasks/T-1/notes with space.md",
    );
    expect(
      parseTaskProjectionPorcelainPath(
        'R  ".agentplane/tasks/T-1/old.md" -> ".agentplane/tasks/T-1/new name.md"',
      ),
    ).toBe(".agentplane/tasks/T-1/new name.md");
    expect(parseTaskProjectionPorcelainPath(" M .agentplane/tasks/T-1/README.md")).toBe(
      ".agentplane/tasks/T-1/README.md",
    );
  });
});
