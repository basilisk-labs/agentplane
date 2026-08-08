import { describe, expect, it } from "vitest";

import { usesExternalImplementationAuthority } from "./external-agent-purpose.js";

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
});
