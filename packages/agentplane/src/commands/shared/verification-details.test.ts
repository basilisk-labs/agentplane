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
          "Result: pass (549 files, 3971 tests).",
          "Evidence: process exited 0 at the evaluated SHA.",
          "Scope: complete local suite.",
        ].join("\n"),
      )?.[0]?.result,
    ).toBe("pass");
  });

  it("accepts repeated inline check blocks emitted by shell-safe agent commands", () => {
    expect(
      parseVerificationCheckDetails(
        "Command: bun test. Result: pass. Evidence: 7 tests passed. Scope: focused suite. " +
          "Command: bun run typecheck. Result: pass. Evidence: exited 0. Scope: types.",
      ),
    ).toEqual([
      {
        command: "bun test.",
        result: "pass",
        evidence: "7 tests passed.",
        scope: "focused suite.",
      },
      {
        command: "bun run typecheck.",
        result: "pass",
        evidence: "exited 0.",
        scope: "types.",
      },
    ]);
  });

  it("keeps label-shaped text inside inline check values", () => {
    expect(
      parseVerificationCheckDetails(
        'Command: sh -c "echo Scope: smoke". Result: pass. ' +
          "Evidence: output mentioned Command: without starting a field. Scope: focused.",
      ),
    ).toEqual([
      {
        command: 'sh -c "echo Scope: smoke".',
        result: "pass",
        evidence: "output mentioned Command: without starting a field.",
        scope: "focused.",
      },
    ]);
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
