import { describe, expect, it } from "vitest";

import { validateArchiveEntries } from "./archive.js";

describe("archive validation", () => {
  it("rejects traversal and absolute paths", () => {
    const issues = validateArchiveEntries(
      ["../evil.txt", "/abs/path", "ok/file.txt", String.raw`C:\evil.txt`],
      [],
    );
    const reasons = issues.map((issue) => issue.reason);
    expect(reasons).toContain("path traversal");
    expect(reasons).toContain("absolute path");
    expect(reasons).toContain("drive letter path");
  });

  it("rejects symlink entries", () => {
    const issues = validateArchiveEntries(["link", "ok.txt"], ["link"]);
    expect(issues).toEqual([{ entry: "link", reason: "symlink entry" }]);
  });
});
