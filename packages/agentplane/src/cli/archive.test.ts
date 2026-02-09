import { describe, expect, it } from "vitest";

import { detectArchiveType, validateArchiveEntries } from "./archive.js";

describe("archive", () => {
  it("detectArchiveType recognizes tar.gz/tgz/zip and rejects unknown", () => {
    expect(detectArchiveType("x.tar.gz")).toBe("tar");
    expect(detectArchiveType("x.tgz")).toBe("tar");
    expect(detectArchiveType("x.zip")).toBe("zip");
    expect(detectArchiveType("x.TGZ")).toBe("tar");
    expect(detectArchiveType("x.txt")).toBeNull();
  });

  it("validateArchiveEntries rejects unsafe paths and symlinks", () => {
    const entries = [
      "ok/file.txt",
      "null\u0000byte",
      "/abs/path",
      "C:/drive/path",
      "../traversal",
      "..",
      // Not traversal after normalization, but can still be unsafe if it targets a symlink.
      "a/../symlink-target",
      // Backslashes should be treated as separators.
      String.raw`dir\file.txt`,
    ];

    const symlinks = ["raw-symlink", "symlink-target", "dir/file.txt"];
    const issues = validateArchiveEntries(entries, symlinks);

    expect(issues).toEqual(
      expect.arrayContaining([
        { entry: "null\u0000byte", reason: "null byte" },
        { entry: "/abs/path", reason: "absolute path" },
        { entry: "C:/drive/path", reason: "drive letter path" },
        { entry: "../traversal", reason: "path traversal" },
        { entry: "..", reason: "path traversal" },
        { entry: "a/../symlink-target", reason: "symlink entry" },
        { entry: String.raw`dir\file.txt`, reason: "symlink entry" },
      ]),
    );

    expect(issues.some((i) => i.entry === "ok/file.txt")).toBe(false);
  });
});
