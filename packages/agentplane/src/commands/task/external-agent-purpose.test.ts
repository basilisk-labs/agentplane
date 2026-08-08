import { describe, expect, it } from "vitest";

import {
  recoversRecordedImplementationCommit,
  usesExternalImplementationAuthority,
} from "./external-agent-purpose.js";

describe("usesExternalImplementationAuthority", () => {
  it.each(["implementation", "implementation_rework", "task_worktree_resolution"] as const)(
    "classifies %s as implementation authority",
    (purpose) => {
      expect(usesExternalImplementationAuthority(purpose)).toBe(true);
    },
  );

  it.each(["planning", "verification", "quality_review"] as const)(
    "keeps %s on read-only result freshness",
    (purpose) => {
      expect(usesExternalImplementationAuthority(purpose)).toBe(false);
    },
  );

  it.each([
    ["implementation", true],
    ["implementation_rework", false],
    ["task_worktree_resolution", false],
    ["planning", false],
    ["verification", false],
    ["quality_review", false],
  ] as const)("binds recorded commit recovery for %s: %s", (purpose, expected) => {
    expect(recoversRecordedImplementationCommit(purpose)).toBe(expected);
  });
});
