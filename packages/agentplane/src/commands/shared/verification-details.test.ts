import { describe, expect, it } from "vitest";

import { parseVerificationCheckDetails } from "./verification-details.js";

describe("verification details", () => {
  it("accepts a terminal period after the typed outcome", () => {
    expect(
      parseVerificationCheckDetails(
        [
          "Command: bun run typecheck",
          "Result: pass.",
          "Evidence: process exited 0 at the evaluated SHA.",
          "Scope: TypeScript contracts.",
        ].join("\n"),
      )?.[0]?.result,
    ).toBe("pass");
  });

  it("accepts bounded result commentary after the typed outcome", () => {
    expect(
      parseVerificationCheckDetails(
        [
          "Command: bun run test:critical",
          "Result: pass; 12 chunks and 84 tests passed.",
          "Evidence: process exited 0 at the evaluated SHA.",
          "Scope: critical compatibility paths.",
        ].join("\n"),
      ),
    ).toEqual([
      {
        command: "bun run test:critical",
        result: "pass",
        evidence: "process exited 0 at the evaluated SHA.",
        scope: "critical compatibility paths.",
      },
    ]);
  });

  it("accepts parenthesized result counts after the typed outcome", () => {
    expect(
      parseVerificationCheckDetails(
        [
          "Command: bun run test:fast",
          "Result: pass (549 files, 3971 tests)",
          "Evidence: process exited 0 at the evaluated SHA.",
          "Scope: complete local suite.",
        ].join("\n"),
      )?.[0]?.result,
    ).toBe("pass");
  });

  it.each(["passed", "pass maybe", "failure", "fail open", "pass;"])(
    "rejects an ambiguous result value: %s",
    (result) => {
      expect(
        parseVerificationCheckDetails(
          [
            "Command: bun run test:critical",
            `Result: ${result}`,
            "Evidence: no deterministic receipt.",
            "Scope: critical compatibility paths.",
          ].join("\n"),
        ),
      ).toBeNull();
    },
  );
});
