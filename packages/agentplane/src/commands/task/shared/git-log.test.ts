import { describe, expect, it } from "vitest";

import { parseGitLogHashSubject } from "./git-log.js";

describe("parseGitLogHashSubject", () => {
  it("parses NUL-separated hash and subject (subject may contain colons)", () => {
    const out = "abc123\0✨ DH1CKG commit: enforce subject template\n";
    expect(parseGitLogHashSubject(out)).toEqual({
      hash: "abc123",
      subject: "✨ DH1CKG commit: enforce subject template",
    });
  });

  it("throws when the NUL separator is missing", () => {
    expect(() => parseGitLogHashSubject("abc123:subject\n")).toThrow(/missing NUL separator/iu);
  });
});
