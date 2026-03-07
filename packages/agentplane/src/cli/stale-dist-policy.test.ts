import { describe, expect, it } from "vitest";

import { classifyStaleDistPolicy } from "../../bin/stale-dist-policy.js";

describe("stale-dist command policy", () => {
  it("allows doctor as a warning-only diagnostic command", () => {
    expect(classifyStaleDistPolicy(["node", "agentplane", "doctor"])).toEqual({
      mode: "warn_and_run",
      reason: "read_only_diagnostic",
    });
  });

  it("allows runtime explain and its flags as a warning-only diagnostic command", () => {
    expect(classifyStaleDistPolicy(["node", "agentplane", "runtime", "explain", "--json"])).toEqual(
      {
        mode: "warn_and_run",
        reason: "read_only_diagnostic",
      },
    );
  });

  it("keeps non-diagnostic commands strict in this first P0 step", () => {
    expect(classifyStaleDistPolicy(["node", "agentplane", "task", "list"])).toEqual({
      mode: "strict",
      reason: "default",
    });
  });
});
